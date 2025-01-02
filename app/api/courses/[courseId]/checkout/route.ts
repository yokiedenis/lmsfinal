// import { db } from "@/lib/db";
// import { currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { stripe } from "@/lib/stripe";

// export async function POST(
//     req: Request,
//     { params }: { params: { courseId: string } }
// ) {
//     try {

//         // We are creating a customer but we don't know when their payment 
//         // method will be charged. We need to create a customer in Stripe
//         // and then create a session for them to pay for the course.

//         // The metadata is used to identify the user and the course they are
//         // purchasing. We will use this information in the webhook to update
//         // the database.

//         const user = await currentUser();   

//         if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         const course = await db.course.findUnique({
//             where: {
//                 id: params.courseId,
//                 isPublished: true,
//             },
//         });

//         const purchase = await db.purchase.findUnique({
//             where: {
//                 userId_courseId: {
//                     userId: user.id,
//                     courseId: params.courseId,
//                 },
//             },
//         });

//         if (purchase) {
//             return new NextResponse("Already Purchased", { status: 400 });
//         }

//         if (!course) {
//             return new NextResponse("Not Found", { status: 404 });
//         }   

//         // define line items for stripe check out page.
//         const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
//             {
//                 price_data: {
//                     currency: "usd",
//                     product_data: {
//                         name: course.title,
//                     },
//                     unit_amount: Math.round(course.price! * 100),
//                 },
//                 quantity: 1,
//             },
//         ];

//         let stripeCustomer = await db.stripeCustomer.findUnique({
//             where: {
//                 userId: user.id,
//             },
//             select: {
//                 stripeCustomerId: true,
//             },
//         });

//         if (!stripeCustomer) {
//             const customer = await stripe.customers.create({
//                 email: user.emailAddresses?.[0]?.emailAddress,
//             });

//             stripeCustomer = await db.stripeCustomer.create({
//                 data: {
//                     userId: user.id,
//                     stripeCustomerId: customer.id,
//                 },
//             });
//         }

//         const session = await stripe.checkout.sessions.create({
//             customer: stripeCustomer.stripeCustomerId,
//             line_items: lineItems,
//             mode: "payment",
//             success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
//             cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
//             metadata: {
//                 courseId: course.id,
//                 userId: user.id,
//             },
//         });

//         return NextResponse.json({ url: session.url });
        
//     } catch (error) {
//         console.log("COURSE_ID_CHECKOUT", error);
//         return new NextResponse("Internal Error", { status: 500 });
//     }
// }


// api/courses/[courseId]/checkout.ts



 

import { NextResponse } from 'next/server';
import axios from 'axios';

const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';

const createToken = async (amount: number) => {
  const payload = {
    CompanyToken: COMPANY_TOKEN,
    Amount: amount,
    // Add other required fields as per DPO API documentation
  };

  const response = await axios.post(`${DPO_API_URL}CreateToken`, payload);
  return response.data;
};

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  const { price } = await req.json(); // Get the price from the request body

  try {
    const tokenResponse = await createToken(price); // Use the price from the request
    const paymentUrl = `https://secure.3gdirectpay.com/payv3.php?ID=${tokenResponse.Token}`;
    return NextResponse.json({ url: paymentUrl });
  } catch (error) {
    console.error('Error creating token:', error);
    return NextResponse.json({ error: 'Failed to create payment token' }, { status: 500 });
  }
}