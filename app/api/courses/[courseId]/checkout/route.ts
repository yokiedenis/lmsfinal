 

// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';

// const createToken = async (
//   amount: number | null | undefined,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = Number(amount).toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${process.env.BASE_URL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();
//   let tokenResponse, parsedResponse;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price === 0 ? 0.01 : price;

//     // DPO Payment Token Creation
//     tokenResponse = await createToken(amount, serviceType, params);
//     parsedResponse = new XMLParser().parse(tokenResponse);

//     if (parsedResponse.API3G.Result !== '000') {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//     const token = parsedResponse.API3G.TransToken;
//     if (!token) {
//       throw new Error('Invalid token response');
//     }

//     // User Authentication
//     const user = await currentUser();   
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Check if the user has already purchased this course
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // Store transaction details and purchase record in the database
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//       }
//     });

//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     });

//     // Redirect to payment success page
//    // const successRedirectUrl = `${process.env.BASE_URL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;
//     const successRedirectUrl = `http://localhost:3000/api/payment-success`;

//     return NextResponse.redirect(successRedirectUrl);

//   } catch (error) {
//     if (error instanceof Error) {
//       let errorMessage = error.message;

//       if (tokenResponse && errorMessage.includes('Transaction created')) {
//         parsedResponse = new XMLParser().parse(tokenResponse);
//         return NextResponse.json({
//           url: `https://secure.3gdirectpay.com/payv3.php?ID=${parsedResponse.API3G.TransToken}`,
//         });
//       }

//       return NextResponse.json({ error: errorMessage }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }





import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';

const createToken = async (
  amount: number | null | undefined,
  serviceType: number,
  params: { courseId: string; chapterId: string }
) => {
  if (amount == null) {
    throw new Error('Payment amount is not provided');
  }

  const formattedAmount = Number(amount).toFixed(2);
  const serviceDate = new Date().toISOString().split('T')[0];
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';
  const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

  const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
    <API3G>
      <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
      <Request>createToken</Request>
      <Transaction>
        <PaymentAmount>${formattedAmount}</PaymentAmount>
        <PaymentCurrency>USD</PaymentCurrency>
        <RedirectURL>${redirectUrl}</RedirectURL>
        <BackURL>${redirectUrl}</BackURL>
        <CompanyRefUnique>0</CompanyRefUnique>
      </Transaction>
      <Services>
        <Service>
          <ServiceType>${serviceType}</ServiceType>
          <ServiceDescription>Test Service</ServiceDescription>
          <ServiceDate>${serviceDate}</ServiceDate>
        </Service>
      </Services>
    </API3G>`;

  try {
    const response = await axios.post(DPO_API_URL, xmlPayload, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('DPO API Error:', error.response?.data || error.message);
    } else {
      console.error('DPO API Error:', error);
    }
    throw new Error('Failed to create payment token');
  }
};

export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  const { price, serviceType } = await req.json();
  let tokenResponse, parsedResponse;

  try {
    if (price == null) {
      throw new Error('Price is not provided');
    }

    const amount = price === 0 ? 0.01 : price;

    // DPO Payment Token Creation
    tokenResponse = await createToken(amount, serviceType, params);
    parsedResponse = new XMLParser().parse(tokenResponse);

    if (parsedResponse.API3G.Result !== '000') {
      throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
    }

    const token = parsedResponse.API3G.TransToken;
    if (!token) {
      throw new Error('Invalid token response');
    }

    // User Authentication
    const user = await currentUser();   
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if course exists and is published
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Check if the user has already purchased this course
    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (existingPurchase) {
      return new NextResponse("Already Purchased", { status: 400 });
    }

    // Store transaction details and purchase record in the database
    const transaction = await db.transaction.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
        amount: amount,
        dpoToken: token,
      }
    });

    const purchase = await db.purchase.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
        transactionId: transaction.id,
      }
    });

    // Redirect to payment success page
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';
    const successRedirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}&token=${token}`;

    return NextResponse.redirect(successRedirectUrl);

  } catch (error) {
    if (error instanceof Error) {
      let errorMessage = error.message;

      if (tokenResponse && errorMessage.includes('Transaction created')) {
        parsedResponse = new XMLParser().parse(tokenResponse);
        return NextResponse.json({
          url: `https://secure.3gdirectpay.com/payv3.php?ID=${parsedResponse.API3G.TransToken}`,
        });
      }

      return NextResponse.json({ error: errorMessage }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}