
// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';

// const createToken = async (amount: number | null | undefined, serviceType: number) => {
//   // Check if amount is null or undefined, set a default if necessary
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   // Ensure the amount is formatted correctly
//   const formattedAmount = Number(amount).toFixed(2); // Convert to number and then format

//   // Use current date as a default service date, format as YYYY-MM-DD
//   const serviceDate = new Date().toISOString().split('T')[0];

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
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
//         'Content-Type': 'application/xml'
//       }
//     });
//     console.log('DPO API Response:', response.data); // Log the full response for debugging
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

// export async function POST(req: Request, { params }: { params: { courseId: string } }) {
//   const { price, serviceType } = await req.json(); // Ensure serviceType is sent from the client
//   let tokenResponse, parsedResponse;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }
    
//     const amount = price === 0 ? 0.01 : price;
    
//     tokenResponse = await createToken(amount, serviceType);
//     parsedResponse = new XMLParser().parse(tokenResponse);
    
//     if (parsedResponse.API3G.Result !== '000') { 
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//     const token = parsedResponse.API3G.TransToken;
//     if (!token) {
//       throw new Error('Invalid token response');
//     }
    
//     // Construct the payment URL with success and cancel URLs
//     const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${params.courseId}?success=1`;
//     const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${params.courseId}?canceled=1`;
//     const paymentUrl = `https://secure.3gdirectpay.com/payv3.php?ID=${token}&success_url=${encodeURIComponent(successUrl)}&cancel_url=${encodeURIComponent(cancelUrl)}`;

//     console.log('Payment URL:', paymentUrl); // Log the URL for debugging
    
//     return NextResponse.json({ url: paymentUrl });
//   } catch (error) {
//     if (error instanceof Error) {
//      // console.error('Error creating token:', error.message);
//       let errorMessage = error.message; // Directly use the error message

//       // Here we check if we have a tokenResponse to avoid the name cannot be found error
//       if (tokenResponse && errorMessage.includes('Transaction created')) {
//         // Re-parse in case we need to access token again
//         parsedResponse = new XMLParser().parse(tokenResponse); 
//         return NextResponse.json({ url: `https://secure.3gdirectpay.com/payv3.php?ID=${parsedResponse.API3G.TransToken}` });
//       }
      
//       // If there's no tokenResponse or it's not a success message, return the error
//       return NextResponse.json({ error: errorMessage }, { status: 500 });
//     } else {
//       console.error('Error creating token:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }






// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';

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

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
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

//     tokenResponse = await createToken(amount, serviceType, params);
//     parsedResponse = new XMLParser().parse(tokenResponse);

//     if (parsedResponse.API3G.Result !== '000') {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//     const token = parsedResponse.API3G.TransToken;
//     if (!token) {
//       throw new Error('Invalid token response');
//     }

//     // Redirect to the appropriate page
//     const redirectUrl = `${process.env.BASE_URL}/courses/${params.courseId}/chapters/${params.chapterId}/`;
//     console.log('Redirect URL:', redirectUrl);

//     return NextResponse.redirect(redirectUrl);
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

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
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

//     // User Authentication (Assuming you have a currentUser function for user context)
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
//     const purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (purchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // Store DPO transaction details in the database
//     await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//       }
//     });

//     // Redirect to the appropriate page or payment gateway
//     const redirectUrl = `${process.env.BASE_URL}/courses/${params.courseId}/chapters/${params.chapterId}/`;
//     console.log('Redirect URL:', redirectUrl);

//     return NextResponse.redirect(redirectUrl);

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
  const redirectUrl = `${process.env.BASE_URL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

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
   // const successRedirectUrl = `${process.env.BASE_URL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;
    const successRedirectUrl = `http://localhost:3000/api/payment-success`;

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
// ): Promise<string> => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = Number(amount).toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
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
//   let tokenResponse: string | undefined;
//   let parsedResponse: any;
//   let redirectUrl: string;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price === 0 ? 0.01 : price;

//     // DPO Payment Token Creation
//     tokenResponse = await createToken(amount, serviceType, params);
//     if (!tokenResponse) {
//       throw new Error('No response from token creation');
//     }
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
//     }).catch((err) => {
//       console.error('Error creating transaction:', err);
//       throw err;
//     });

//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     }).catch((err) => {
//       console.error('Error creating purchase:', err);
//       throw err;
//     });

//     // Instead of directly redirecting, we provide a URL to DPO which will redirect back to your site after payment
//     redirectUrl = `${process.env.BASE_URL}/courses/${params.courseId}/chapters/${params.chapterId}/`;
//     console.log('Redirect URL:', redirectUrl);

//     // This is the URL that DPO will redirect to after payment confirmation
//     const successUrl = `${process.env.BASE_URL}/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//     // Send the user to DPO's payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}&success_url=${encodeURIComponent(successUrl)}&error_url=${encodeURIComponent(redirectUrl)}`,
//     });

//   } catch (error: unknown) {
//     // Handle the error as an instance of Error
//     if (error instanceof Error) {
//       let errorMessage = error.message;

//       // If token creation failed, still return the DPO payment URL but with an error message
//       if (tokenResponse && errorMessage.includes('Transaction created')) {
//         parsedResponse = new XMLParser().parse(tokenResponse);
//         // Ensure redirectUrl is defined before using it in the catch block
//         redirectUrl = `${process.env.BASE_URL}/courses/${params.courseId}/chapters/${params.chapterId}/`;
//         // If there was an error in creating transaction or purchase, still send to payment but with error handling
//         return NextResponse.json({
//           url: `https://secure.3gdirectpay.com/payv3.php?ID=${parsedResponse.API3G.TransToken}&success_url=${encodeURIComponent(redirectUrl)}&error_url=${encodeURIComponent(redirectUrl)}`,
//         });
//       }

//       // Return the error message
//       console.error('Error:', error.message);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       // Handle unexpected errors
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

















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
// ): Promise<string> => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = Number(amount).toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <CompanyRef>${params.courseId}-${params.chapterId}-${Date.now()}</CompanyRef>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Course Purchase</ServiceDescription>
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
//   let tokenResponse: string | undefined;
//   let parsedResponse: any;
//   let redirectUrl: string;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price === 0 ? 0.01 : price;

//     // Create DPO Payment Token
//     tokenResponse = await createToken(amount, serviceType, params);
//     if (!tokenResponse) {
//       throw new Error('No response from token creation');
//     }

//     parsedResponse = new XMLParser().parse(tokenResponse);

//     // Check DPO API result
//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === 'Transaction created') {
//       const token = parsedResponse.API3G.TransToken;

//       if (!token) {
//         throw new Error('Invalid or missing transaction token in response');
//       }

//       // Authenticate User
//       const user = await currentUser();
//       if (!user || !user.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//       // Check if the course exists and is published
//       const course = await db.course.findUnique({
//         where: {
//           id: params.courseId,
//           isPublished: true,
//         },
//       });

//       if (!course) {
//         return new NextResponse("Course not found", { status: 404 });
//       }

//       // Check if the user has already purchased the course
//       const existingPurchase = await db.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: user.id,
//             courseId: params.courseId,
//           },
//         },
//       });

//       if (existingPurchase) {
//         return new NextResponse("Already Purchased", { status: 400 });
//       }

//       // Store transaction and purchase details
//       const transaction = await db.transaction.create({
//         data: {
//           userId: user.id,
//           courseId: params.courseId,
//           amount: amount,
//           dpoToken: token,
//         }
//       });

//       await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: params.courseId,
//           transactionId: transaction.id,
//         }
//       });

//       // Generate redirect URLs
//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//       redirectUrl = `${baseUrl}/courses/${params.courseId}/chapters/${params.chapterId}/`;

//       const successUrl = `${baseUrl}/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;
//       const errorUrl = redirectUrl;

//       console.log('Redirect URL:', redirectUrl);
//       console.log('Success URL:', successUrl);

//       // Send the user to DPO's payment page
//       return NextResponse.json({
//         url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}&success_url=${encodeURIComponent(successUrl)}&error_url=${encodeURIComponent(errorUrl)}`,
//       });
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error:', error.message);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }
















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
// ): Promise<string> => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = Number(amount).toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <CompanyRef>${params.courseId}-${params.chapterId}-${Date.now()}</CompanyRef>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Course Purchase</ServiceDescription>
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
//   let tokenResponse: string | undefined;
//   let parsedResponse: any;
//   let redirectUrl: string;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price === 0 ? 0.01 : price;

//     // Create DPO Payment Token
//     tokenResponse = await createToken(amount, serviceType, params);
//     if (!tokenResponse) {
//       throw new Error('No response from token creation');
//     }

//     parsedResponse = new XMLParser().parse(tokenResponse);

//     // Check DPO API result
//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === 'Transaction created') {
//       const token = parsedResponse.API3G.TransToken;

//       if (!token) {
//         throw new Error('Invalid or missing transaction token in response');
//       }

//       // Authenticate User
//       const user = await currentUser();
//       if (!user || !user.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//       // Check if the course exists and is published
//       const course = await db.course.findUnique({
//         where: {
//           id: params.courseId,
//           isPublished: true,
//         },
//       });

//       if (!course) {
//         return new NextResponse("Course not found", { status: 404 });
//       }

//       // Check if the user has already purchased the course
//       const existingPurchase = await db.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: user.id,
//             courseId: params.courseId,
//           },
//         },
//       });

//       if (existingPurchase) {
//         return new NextResponse("Already Purchased", { status: 400 });
//       }

//       // Store transaction and purchase details
//       const transaction = await db.transaction.create({
//         data: {
//           userId: user.id,
//           courseId: params.courseId,
//           amount: amount,
//           dpoToken: token,
//         }
//       });

//       await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: params.courseId,
//           transactionId: transaction.id,
//         }
//       });

//       // Generate redirect URLs
//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//       redirectUrl = `${baseUrl}/courses/${params.courseId}/chapters/${params.chapterId}/`;

//       const successUrl = `${baseUrl}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;
//       const errorUrl = redirectUrl;

//       console.log('Redirect URL:', redirectUrl);
//       console.log('Success URL:', successUrl);

//       // Send the user to DPO's payment page
//       return NextResponse.json({
//         url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}&success_url=${encodeURIComponent(successUrl)}&error_url=${encodeURIComponent(errorUrl)}`,
//       });
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error:', error.message);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }







//working but receiving access denied 


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
// ): Promise<string> => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = Number(amount).toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <CompanyRef>${params.courseId}-${params.chapterId}-${Date.now()}</CompanyRef>
//         <RedirectURL>http://localhost:3000/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}</RedirectURL>
//         <BackURL>http://localhost:3000/courses/${params.courseId}/chapters/${params.chapterId}</BackURL>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Course Purchase</ServiceDescription>
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
//   let tokenResponse: string | undefined;
//   let parsedResponse: any;
//   let redirectUrl: string;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price === 0 ? 0.01 : price;

//     // Create DPO Payment Token
//     tokenResponse = await createToken(amount, serviceType, params);
//     if (!tokenResponse) {
//       throw new Error('No response from token creation');
//     }

//     parsedResponse = new XMLParser().parse(tokenResponse);

//     // Check DPO API result
//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === 'Transaction created') {
//       const token = parsedResponse.API3G.TransToken;

//       if (!token) {
//         throw new Error('Invalid or missing transaction token in response');
//       }

//       // Authenticate User
//       const user = await currentUser();
//       if (!user || !user.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//       // Check if the course exists and is published
//       const course = await db.course.findUnique({
//         where: {
//           id: params.courseId,
//           isPublished: true,
//         },
//       });

//       if (!course) {
//         return new NextResponse("Course not found", { status: 404 });
//       }

//       // Check if the user has already purchased the course
//       const existingPurchase = await db.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: user.id,
//             courseId: params.courseId,
//           },
//         },
//       });

//       if (existingPurchase) {
//         return new NextResponse("Already Purchased", { status: 400 });
//       }

//       // Store transaction and purchase details
//       const transaction = await db.transaction.create({
//         data: {
//           userId: user.id,
//           courseId: params.courseId,
//           amount: amount,
//           dpoToken: token,
//         }
//       });

//       // Here, we're not creating the purchase record yet because we'll do it after payment confirmation

//       // Generate redirect URLs
//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//       redirectUrl = `${baseUrl}/courses/${params.courseId}/chapters/${params.chapterId}/`;

//       const successUrl = `${baseUrl}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;
//       const errorUrl = redirectUrl;

//       console.log('Redirect URL:', redirectUrl);
//       console.log('Success URL:', successUrl);

//       // Send the user to DPO's payment page
//       return NextResponse.json({
//         url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}&success_url=${encodeURIComponent(successUrl)}&error_url=${encodeURIComponent(errorUrl)}`,
//       });
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error:', error.message);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }





























//final 

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
// ): Promise<any> => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = Number(amount).toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
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

//     const parser = new XMLParser();
//     const parsedResponse = parser.parse(response.data);

//     if (!parsedResponse || !parsedResponse.API3G) {
//       throw new Error("Invalid response from DPO API");
//     }

//     return parsedResponse.API3G;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', (error as Error).message);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error("Price is not provided");
//     }

//     const amount = price === 0 ? 0.01 : price;

//     // Create payment token via DPO
//     const dpoResponse = await createToken(amount, serviceType, params);
//     if (!dpoResponse) {
//       throw new Error("No response from token creation");
//     }

//     // Check if the transaction was successful
//     if (dpoResponse.Result === "0") {
//       const token = dpoResponse.TransToken;
//       if (!token) {
//         throw new Error("Invalid token response");
//       }

//       // Get the current user
//       const user = await currentUser();
//       if (!user || !user.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//       // Validate the course
//       const course = await db.course.findUnique({
//         where: {
//           id: params.courseId,
//           isPublished: true,
//         },
//       });
//       if (!course) {
//         return new NextResponse("Course not found", { status: 404 });
//       }

//       // Check if the user already purchased the course
//       const existingPurchase = await db.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: user.id,
//             courseId: params.courseId,
//           },
//         },
//       });
//       if (existingPurchase) {
//         return new NextResponse("Already Purchased", { status: 400 });
//       }

//       // Save the transaction in the database
//       await db.transaction.create({
//         data: {
//           userId: user.id,
//           courseId: params.courseId,
//           amount: amount,
//           dpoToken: token,
//         },
//       });

//       // Generate redirect URLs
//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//       const successUrl = `${baseUrl}/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;
//       const errorUrl = `${baseUrl}/payment-error?courseId=${params.courseId}`;

//       // Redirect to DPO's payment gateway
//       return NextResponse.json({
//         url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}&success_url=${encodeURIComponent(successUrl)}&error_url=${encodeURIComponent(errorUrl)}`,
//       });
//     } else {
//       throw new Error(`Transaction failed: ${dpoResponse.ResultExplanation || "Unknown error"}`);
//     }
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
//     console.error("Error during payment processing:", errorMessage);
//     return new NextResponse(`Error during payment processing: ${errorMessage}`, { status: 500 });
//   }
// }






 