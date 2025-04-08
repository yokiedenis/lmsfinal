 

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





// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

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
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

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

//     // Create transaction
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING', // Initial status
//       }
//     });

//     console.log('Transaction created:', transaction);

//     // Create purchase
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     });

//     console.log('Purchase created:', purchase);

//     // Redirect to payment success page
//     const successRedirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}&TransactionToken=${token}`;

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

//       console.error('Error in payment processing:', error);
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
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null | undefined,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

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

//     const parsedResponse = new XMLParser().parse(response.data);

//     // Check for success condition. '000' generally means success, but DPO might have other codes for success.
//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

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
//   let tokenResponse;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;

//     // DPO Payment Token Creation
//     const token = await createToken(amount, serviceType, params);

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

//     // Create transaction
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       }
//     }).catch((error) => {
//       console.error('Failed to create transaction:', error);
//       throw error;
//     });

//     console.log('Transaction created:', transaction);

//     // Create purchase
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     }).catch((error) => {
//       console.error('Failed to create purchase:', error);
//       throw error;
//     });

//     console.log('Purchase created:', purchase);

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
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
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';
// //const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://eduskill-mu.vercel.app/';


// const createToken = async (
//   amount: number | null | undefined,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

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

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();
//   let tokenResponse;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;

//     // DPO Payment Token Creation with Retry
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

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

//     // Create transaction
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       }
//     }).catch((error) => {
//       console.error('Failed to create transaction:', error);
//       throw error;
//     });

//     console.log('Transaction created:', transaction);

//     // Create purchase
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     }).catch((error) => {
//       console.error('Failed to create purchase:', error);
//       throw error;
//     });

//     console.log('Purchase created:', purchase);

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }


// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     // Verify the token
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       // Update transaction status to COMPLETED
//       await db.transaction.update({
//         where: {
//           dpoToken: token,  // Use dpoToken to find the transaction
//         },
//         data: {
//           status: 'SUCCESS',
//         },
//       });

//       // Redirect to the success page
//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     } else {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment verification:', error);
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
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';



// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

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

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;

//     // DPO Payment Token Creation with Retry
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

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

//     // Create transaction only (no purchase yet)
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     }).catch((error) => {
//       console.error('Failed to create transaction:', error);
//       throw error;
//     });

//     console.log('Transaction created:', transaction);

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     // Verify the token
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       // Update transaction status to COMPLETED
//       const transaction = await db.transaction.update({
//         where: {
//           dpoToken: token,
//         },
//         data: {
//           status: 'SUCCESS',
//         },
//       });

//       console.log('Transaction updated:', transaction);

//       // User Authentication
//       const user = await currentUser();
//       if (!user || !user.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//       // Check if the user has already purchased this course
//       const existingPurchase = await db.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: user.id,
//             courseId: courseId,
//           },
//         },
//       });

//       if (existingPurchase) {
//         return new NextResponse("Already Purchased", { status: 400 });
//       }

//       // Create purchase record only after payment is verified
//       const purchase = await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           transactionId: transaction.id,
//         },
//       }).catch((error) => {
//         console.error('Failed to create purchase:', error);
//         throw error;
//       });

//       console.log('Purchase created:', purchase);

//       // Redirect to the success page
//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     } else {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment verification:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }












// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

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
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     if (!isVerified) {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     // Find the transaction first to ensure it exists
//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//     });

//     if (!transaction) {
//       console.error(`Transaction not found for token: ${token}`);
//       return new NextResponse("Transaction not found", { status: 404 });
//     }

//     // Update transaction status
//     const updatedTransaction = await db.transaction.update({
//       where: { dpoToken: token },
//       data: { status: 'SUCCESS' },
//     });

//     console.log('Transaction updated to SUCCESS:', updatedTransaction);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       console.error('User not authenticated');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Double-check the purchase doesn’t already exist
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: courseId },
//       },
//     });

//     if (existingPurchase) {
//       console.log(`Purchase already exists for user ${user.id} and course ${courseId}`);
//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     }

//     // Create the purchase record
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: courseId,
//         transactionId: updatedTransaction.id,
//       },
//     });

//     console.log('Purchase successfully created:', purchase);

//     return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }





















// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   // Align redirect URL with the GET route path (assuming /api/courses/[courseId]/checkout)
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout?courseId=${params.courseId}&chapterId=${params.chapterId}`;

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
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(req: Request, { params }: { params: { courseId: string } }) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = params.courseId; // From route params
//   const chapterId = url.searchParams.get('chapterId');

//   console.log('GET route triggered with:', { token, courseId, chapterId });

//   if (!token || !courseId || !chapterId) {
//     console.error('Missing parameters:', { token, courseId, chapterId });
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     console.log('Token verification result:', isVerified);
//     if (!isVerified) {
//       console.error(`Token verification failed for token: ${token}`);
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//     });

//     if (!transaction) {
//       console.error(`Transaction not found for token: ${token}`);
//       return new NextResponse("Transaction not found", { status: 404 });
//     }

//     const updatedTransaction = await db.transaction.update({
//       where: { dpoToken: token },
//       data: { status: 'SUCCESS' },
//     });

//     console.log('Transaction updated to SUCCESS:', updatedTransaction);

//     const user = await currentUser();
//     console.log('Current user:', user ? user.id : 'No user');
//     if (!user || !user.id) {
//       console.error('User not authenticated');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: courseId },
//       },
//     });

//     console.log('Existing purchase check:', existingPurchase ? 'Found' : 'Not found');

//     if (existingPurchase) {
//       console.log(`Purchase already exists for user ${user.id} and course ${courseId}`);
//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     }

//     try {
//       const purchase = await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           transactionId: updatedTransaction.id,
//         },
//       });
//       console.log('Purchase successfully created:', purchase);
//     } catch (purchaseError) {
//       console.error('Failed to create purchase:', purchaseError);
//       throw new Error('Purchase creation failed');
//     }

//     return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }







// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser, auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId?: string } // Make chapterId optional
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout?courseId=${params.courseId}${params.chapterId ? `&chapterId=${params.chapterId}` : ''}`;

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
//     console.log('Sending request to DPO API with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 
//         'Content-Type': 'application/xml',
//         'Accept': 'application/xml',
//       },
//     });

//     console.log('DPO API response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G && (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created")) {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G?.ResultExplanation || 'Unknown error'}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//       if (error.response?.status === 403) {
//         throw new Error('DPO API access denied (403 Forbidden). Check CompanyToken, IP restrictions, or contact DPO support.');
//       }
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     console.log('Verifying token with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     console.log('DPO API verify response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId?: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId?: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       console.error('User not authenticated in POST');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(req: Request, { params }: { params: { courseId: string } }) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token') || url.searchParams.get('TransactionToken') || url.searchParams.get('ID');
//   const courseId = params.courseId;
//   const chapterId = url.searchParams.get('chapterId');

//   console.log('GET /checkout triggered with:', { token, courseId, chapterId });

//   if (!token || !courseId) {
//     return new NextResponse("Missing required parameters", { status: 400 });
//   }

//   try {
//     // Verify payment token
//     const isVerified = await verifyToken(token);
//     if (!isVerified) {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     // Find transaction and update status
//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//     });

//     if (!transaction) {
//       return new NextResponse("Transaction not found", { status: 404 });
//     }

//     const updatedTransaction = await db.transaction.update({
//       where: { dpoToken: token },
//       data: { status: 'SUCCESS' },
//     });

//     // Get user ID from transaction record
//     const userId = transaction.userId;
//     if (!userId) {
//       return new NextResponse("User not found in transaction", { status: 404 });
//     }

//     // Check if user exists
//     const userExists = await db.user.findUnique({
//       where: { id: userId },
//     });

//     if (!userExists) {
//       return new NextResponse("User not found", { status: 404 });
//     }

//     // Create purchase if not exists
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: userId,
//           courseId: courseId,
//         },
//       },
//     });

//     if (!existingPurchase) {
//       await db.purchase.create({
//         data: {
//           userId: userId,
//           courseId: courseId,
//           transactionId: updatedTransaction.id,
//         },
//       });
//       console.log('Purchase created successfully');
//     }

//     // Redirect to success page
//     const redirectUrl = `${baseURL}/payment-success?courseId=${courseId}${chapterId ? `&chapterId=${chapterId}` : ''}`;
//     return NextResponse.redirect(redirectUrl);
//   } catch (error) {
//     console.error('Error in payment verification:', error);
    
//     // Update transaction status to failed
//     if (token) {
//       await db.transaction.update({
//         where: { dpoToken: token },
//         data: { status: 'FAILED' },
//       }).catch(err => console.error('Failed to update transaction status:', err));
//     }
    
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Payment processing failed' },
//       { status: 500 }
//     );
//   }
// }












// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId?: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}api/courses/${params.courseId}/checkout?courseId=${params.courseId}${params.chapterId ? `&chapterId=${params.chapterId}` : ''}`;

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
//     console.log('Sending request to DPO API with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 
//         'Content-Type': 'application/xml',
//         'Accept': 'application/xml',
//       },
//     });

//     console.log('DPO API response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G && (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created")) {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G?.ResultExplanation || 'Unknown error'}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//       if (error.response?.status === 403) {
//         throw new Error('DPO API access denied (403 Forbidden). Check CompanyToken, IP restrictions, or contact DPO support.');
//       }
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     console.log('Verifying token with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     console.log('DPO API verify response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId?: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(request: Request, { params }: { params: { courseId: string; chapterId?: string } }) {
//   const { price, serviceType } = await request.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       console.error('User not authenticated in POST');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(request: Request, { params }: { params: { courseId: string } }) {
//   console.log('GET handler invoked for URL:', request.url);

//   const urlObject = new URL(request.url);
//   console.log('Full Redirect URL from DPO:', urlObject.href); // Log the full URL
//   console.log('All Query Parameters:', Object.fromEntries(urlObject.searchParams));

//   // Broaden the token search to catch DPO's possible parameter names
//   const token = urlObject.searchParams.get('token') || 
//                 urlObject.searchParams.get('TransactionToken') || 
//                 urlObject.searchParams.get('ID') || 
//                 urlObject.searchParams.get('TransID') || 
//                 urlObject.searchParams.get('TransactionID') || // Additional DPO param
//                 urlObject.searchParams.get('transID'); // Case variation
//   const courseId = params.courseId;
//   const chapterId = urlObject.searchParams.get('chapterId');

//   console.log('Extracted parameters:', { token, courseId, chapterId });

//   if (!token || !courseId) {
//     console.error('Missing required parameters:', { token, courseId });
//     return new NextResponse("Missing required parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     console.log('Token verification result:', isVerified);
//     if (!isVerified) {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     const authenticatedUser = await currentUser();
//     if (!authenticatedUser || !authenticatedUser.id) {
//       console.error('User not authenticated in GET');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const result = await db.$transaction(async (prisma) => {
//       const transaction = await prisma.transaction.findUnique({
//         where: { dpoToken: token },
//       });
//       console.log('Fetched transaction:', transaction);

//       if (!transaction) {
//         throw new Error("Transaction not found");
//       }

//       if (transaction.userId !== authenticatedUser.id) {
//         throw new Error("Transaction does not belong to authenticated user");
//       }

//       const updatedTransaction = await prisma.transaction.update({
//         where: { dpoToken: token },
//         data: { status: 'SUCCESS' },
//       });
//       console.log('Updated transaction to SUCCESS:', updatedTransaction);

//       const userId = transaction.userId;
//       console.log('User ID from transaction:', userId);

//       const user = await prisma.user.findUnique({
//         where: { id: userId },
//         include: { profile: true },
//       });
//       console.log('User with profile:', user);
//       if (!user) {
//         throw new Error("User not found");
//       }

//       if (!user.profile) {
//         await prisma.profile.create({
//           data: {
//             userId: userId,
//             name: authenticatedUser.firstName || "Unknown",
//             email: authenticatedUser.emailAddresses[0].emailAddress,
//             dob: new Date(),
//             occupation: "Unknown",
//             bio: null,
//           },
//         });
//         console.log('Created missing profile for user:', userId);
//       }

//       const course = await prisma.course.findUnique({
//         where: { id: courseId },
//       });
//       console.log('Course exists:', course);
//       if (!course) {
//         throw new Error("Course not found");
//       }

//       const existingPurchase = await prisma.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: userId,
//             courseId: courseId,
//           },
//         },
//       });
//       console.log('Existing purchase:', existingPurchase);

//       if (!existingPurchase) {
//         const newPurchase = await prisma.purchase.create({
//           data: {
//             userId: userId,
//             courseId: courseId,
//             transactionId: updatedTransaction.id,
//           },
//         });
//         console.log('Purchase created successfully:', newPurchase);
//       } else {
//         console.log('Purchase already exists, skipping creation');
//       }

//       return updatedTransaction;
//     });

//     const redirectUrl = `${baseURL}payment-success?courseId=${courseId}${chapterId ? `&chapterId=${chapterId}` : ''}`;
//     console.log('Redirecting to:', redirectUrl);
//     return NextResponse.redirect(redirectUrl);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);

//     if (token) {
//       try {
//         await db.transaction.update({
//           where: { dpoToken: token },
//           data: { status: 'FAILED' },
//         });
//         console.log('Transaction status updated to FAILED');
//       } catch (updateError) {
//         console.error('Failed to update transaction status:', updateError);
//       }
//     }

//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Payment processing failed' },
//       { status: 500 }
//     );
//   }
// }








// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser  } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (amount: number | null, serviceType: number, params: { courseId: string; chapterId?: string }) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}api/courses/${params.courseId}/checkout?courseId=${params.courseId}${params.chapterId ? `&chapterId=${params.chapterId}` : ''}`;

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
//     console.log('Sending request to DPO API with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 
//         'Content-Type': 'application/xml',
//         'Accept': 'application/xml',
//       },
//     });

//     console.log('DPO API response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G && (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created")) {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G?.ResultExplanation || 'Unknown error'}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//       if (error.response?.status === 403) {
//         throw new Error('DPO API access denied (403 Forbidden). Check CompanyToken, IP restrictions, or contact DPO support.');
//       }
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     console.log('Verifying token with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     console.log('DPO API verify response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId?: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(request: Request, { params }: { params: { courseId: string; chapterId?: string } }) {
//   const { price, serviceType } = await request.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser ();
//     if (!user || !user.id) {
//       console.error('User  not authenticated in POST');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(request: Request, { params }: { params: { courseId: string } }) {
//   console.log('GET handler invoked for URL:', request.url);

//   const urlObject = new URL(request.url);
//   console.log('Full Redirect URL from DPO:', urlObject.href); // Log the full URL
//   console.log('All Query Parameters:', Object.fromEntries(urlObject.searchParams));

//   const token = urlObject.searchParams.get('token') || 
//                 urlObject.searchParams.get('TransactionToken') || 
//                 urlObject.searchParams.get('ID') || 
//                 urlObject.searchParams.get('TransID') || 
//                 urlObject.searchParams.get('TransactionID') || 
//                 urlObject.searchParams.get('transID'); 
//   const courseId = params.courseId;
//   const chapterId = urlObject.searchParams.get('chapterId');

//   console.log('Extracted parameters:', { token, courseId, chapterId });

//   if (!token || !courseId) {
//     console.error('Missing required parameters:', { token, courseId });
//     return new NextResponse("Missing required parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     console.log('Token verification result:', isVerified);
//     if (!isVerified) {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     const authenticatedUser  = await currentUser ();
//     if (!authenticatedUser  || !authenticatedUser .id) {
//       console.error('User  not authenticated in GET');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const result = await db.$transaction(async (prisma) => {
//       const transaction = await prisma.transaction.findUnique({
//         where: { dpoToken: token },
//       });
//       console.log('Fetched transaction:', transaction);

//       if (!transaction) {
//         throw new Error("Transaction not found");
//       }

//       if (transaction.userId !== authenticatedUser .id) {
//         throw new Error("Transaction does not belong to authenticated user");
//       }

//       const updatedTransaction = await prisma.transaction.update({
//         where: { dpoToken: token },
//         data: { status: 'SUCCESS' },
//       });
//       console.log('Updated transaction to SUCCESS:', updatedTransaction);

//       const userId = transaction.userId;
//       console.log('User  ID from transaction:', userId);

//       const user = await prisma.user.findUnique({
//         where: { id: userId },
//         include: { profile: true },
//       });
//       console.log('User  with profile:', user);
//       if (!user) {
//         throw new Error("User  not found");
//       }

//       if (!user.profile) {
//         await prisma.profile.create({
//           data: {
//             userId: userId,
//             name: authenticatedUser .firstName || "Unknown",
//             email: authenticatedUser .emailAddresses[0].emailAddress,
//             dob: new Date(),
//             occupation: "Unknown",
//             bio: null,
//           },
//         });
//         console.log('Created missing profile for user:', userId);
//       }

//       const course = await prisma.course.findUnique({
//         where: { id: courseId },
//       });
//       console.log('Course exists:', course);
//       if (!course) {
//         throw new Error("Course not found");
//       }

//       const existingPurchase = await prisma.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: userId,
//             courseId: courseId,
//           },
//         },
//       });
//       console.log('Existing purchase:', existingPurchase);

//       if (!existingPurchase) {
//         const newPurchase = await prisma.purchase.create({
//           data: {
//             userId: userId,
//             courseId: courseId,
//             transactionId: updatedTransaction.id,
//           },
//         });
//         console.log('Purchase created successfully:', newPurchase);
//       } else {
//         console.log('Purchase already exists, skipping creation');
//       }

//       return updatedTransaction;
//     });

//     const redirectUrl = `${baseURL}payment-success?courseId=${courseId}${chapterId ? `&chapterId=${chapterId}` : ''}`;
//     console.log('Redirecting to:', redirectUrl);
//     return NextResponse.redirect(redirectUrl);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);

//     if (token) {
//       try {
//         await db.transaction.update({
//           where: { dpoToken: token },
//           data: { status: 'FAILED' },
//         });
//         console.log('Transaction status updated to FAILED');
//       } catch (updateError) {
//         console.error('Failed to update transaction status:', updateError);
//       }
//     }

//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Payment processing failed' },
//       { status: 500 }
//     );
//   }
// }














// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/';

// const createToken = async (amount: number | null, serviceType: number, params: { courseId: string; chapterId?: string }) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout?courseId=${params.courseId}${params.chapterId ? `&chapterId=${params.chapterId}` : ''}`;

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
//     console.log('Sending request to DPO API with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 
//         'Content-Type': 'application/xml',
//         'Accept': 'application/xml',
//       },
//     });

//     console.log('DPO API response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G && (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created")) {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G?.ResultExplanation || 'Unknown error'}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//       if (error.response?.status === 403) {
//         throw new Error('DPO API access denied (403 Forbidden). Check CompanyToken, IP restrictions, or contact DPO support.');
//       }
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     console.log('Verifying token with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     console.log('DPO API verify response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(request: Request, { params }: { params: { courseId: string; chapterId?: string } }) {
//   const { price, serviceType } = await request.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createToken(amount, serviceType, params);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       console.error('User not authenticated in POST');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(request: Request, { params }: { params: { courseId: string } }) {
//   console.log('GET handler invoked for URL:', request.url);

//   const urlObject = new URL(request.url);
//   console.log('Full Redirect URL from DPO:', urlObject.href);
//   console.log('All Query Parameters:', Object.fromEntries(urlObject.searchParams));

//   const token = urlObject.searchParams.get('TransactionToken') || urlObject.searchParams.get('ID');
//   const courseId = params.courseId;
//   const chapterId = urlObject.searchParams.get('chapterId');

//   console.log('Extracted parameters:', { token, courseId, chapterId });

//   if (!token || !courseId) {
//     console.error('Missing required parameters:', { token, courseId });
//     return NextResponse.redirect(`${baseURL}courses/${courseId}/chapters/${chapterId || ''}/payment_success?status=failed&error=Missing required parameters`);
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     console.log('Token verification result:', isVerified);
//     if (!isVerified) {
//       return NextResponse.redirect(`${baseURL}courses/${courseId}/chapters/${chapterId || ''}/payment_success?status=failed&error=Payment verification failed`);
//     }

//     const authenticatedUser = await currentUser();
//     if (!authenticatedUser || !authenticatedUser.id) {
//       console.error('User not authenticated in GET');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//     });

//     if (!transaction) {
//       throw new Error("Transaction not found");
//     }

//     if (transaction.userId !== authenticatedUser.id) {
//       throw new Error("Transaction does not belong to authenticated user");
//     }

//     const updatedTransaction = await db.transaction.update({
//       where: { dpoToken: token },
//       data: { status: 'SUCCESS' },
//     });

//     console.log('Updated transaction to SUCCESS:', updatedTransaction);

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: authenticatedUser.id, courseId: courseId },
//       },
//     });

//     if (!existingPurchase) {
//       const newPurchase = await db.purchase.create({
//         data: {
//           userId: authenticatedUser.id,
//           courseId: courseId,
//           transactionId: updatedTransaction.id,
//         },
//       });
//       console.log('Purchase created successfully:', newPurchase);
//     } else {
//       console.log('Purchase already exists, skipping creation');
//     }

//     const redirectUrl = `${baseURL}courses/${courseId}/chapters/${chapterId || ''}/payment_success?status=success`;
//     console.log('Redirecting to:', redirectUrl);
//     return NextResponse.redirect(redirectUrl);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);

//     if (token) {
//       try {
//         await db.transaction.update({
//           where: { dpoToken: token },
//           data: { status: 'FAILED' },
//         });
//         console.log('Transaction status updated to FAILED');
//       } catch (updateError) {
//         console.error('Failed to update transaction status:', updateError);
//       }
//     }

//     const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
//     return NextResponse.redirect(`${baseURL}courses/${courseId}/chapters/${chapterId || ''}/payment_success?status=failed&error=${encodeURIComponent(errorMessage)}`);
//   }
// }

















































// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout?courseId=${params.courseId}&chapterId=${params.chapterId}`;

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
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(req: Request, { params }: { params: { courseId: string } }) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token') || url.searchParams.get('TransactionToken') || url.searchParams.get('ID');
//   const courseId = params.courseId;
//   const chapterId = url.searchParams.get('chapterId');

//   console.log('GET route triggered with:', { token, courseId, chapterId });

//   if (!token || !courseId || !chapterId) {
//     console.error('Missing parameters:', { token, courseId, chapterId });
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     console.log('Token verification result:', isVerified);
//     if (!isVerified) {
//       console.error(`Token verification failed for token: ${token}`);
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//     });

//     if (!transaction) {
//       console.error(`Transaction not found for token: ${token}`);
//       return new NextResponse("Transaction not found", { status: 404 });
//     }

//     const updatedTransaction = await db.transaction.update({
//       where: { dpoToken: token },
//       data: { status: 'SUCCESS' },
//     });

//     console.log('Transaction updated to SUCCESS:', updatedTransaction);

//     const user = await currentUser();
//     console.log('Current user:', user ? user.id : 'No user');
//     if (!user || !user.id) {
//       console.error('User not authenticated');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: courseId },
//       },
//     });

//     console.log('Existing purchase check:', existingPurchase ? 'Found' : 'Not found');

//     if (!existingPurchase) {
//       try {
//         await db.$transaction(async (prisma) => {
//           const purchase = await prisma.purchase.create({
//             data: {
//               userId: user.id,
//               courseId: courseId,
//               transactionId: updatedTransaction.id,
//             },
//           });
//           console.log('Purchase successfully created:', purchase);
//           // Verify the purchase exists after creation
//           const verifyPurchase = await prisma.purchase.findUnique({
//             where: {
//               userId_courseId: { userId: user.id, courseId: courseId },
//             },
//           });
//           if (!verifyPurchase) {
//             throw new Error('Purchase record not found after creation');
//           }
//           console.log('Verified purchase:', verifyPurchase);
//         });
//       } catch (purchaseError) {
//         console.error('Failed to create purchase in transaction:', purchaseError);
//         throw new Error('Purchase creation failed');
//       }
//     } else {
//       console.log(`Purchase already exists for user ${user.id} and course ${courseId}`);
//     }

//     return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);
//     if (token) {
//       await db.transaction.update({
//         where: { dpoToken: token },
//         data: { status: 'FAILED' },
//       }).catch(err => console.error('Failed to update transaction to FAILED:', err));
//     }
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }








































































// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null | undefined,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

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

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();
//   let tokenResponse;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;

//     // DPO Payment Token Creation with Retry
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

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

//     // Create transaction
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       }
//     }).catch((error) => {
//       console.error('Failed to create transaction:', error);
//       throw error;
//     });

//     console.log('Transaction created:', transaction);

//     // Create purchase
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     }).catch((error) => {
//       console.error('Failed to create purchase:', error);
//       throw error;
//     });

//     console.log('Purchase created:', purchase);

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     // Verify the token
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       // Update transaction status to COMPLETED
//       await db.transaction.update({
//         where: {
//           dpoToken: token,  // Use dpoToken to find the transaction
//         },
//         data: {
//           status: 'COMPLETED',
//         },
//       });

//       // Redirect to the success page
//      // return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//      return NextResponse.redirect(`${baseURL}/course/${courseId}/chapters/${chapterId}`);
//     } else {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment verification:', error);
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
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout`; // Simplified base URL for redirect

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

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return {
//         token: parsedResponse.API3G.TransToken,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//       };
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' && parsedResponse.API3G.Status === 'CAPTURED') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation || 'Payment not captured'}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   console.log('POST params:', params); // Debug log to verify params
//   console.log('Request body:', { price, serviceType }); // Debug log to verify body

//   try {
//     if (!price) {
//       throw new Error('Price is not provided');
//     }

//     if (!params.chapterId) {
//       throw new Error('ChapterId is missing from route parameters');
//     }

//     const amount = price;

//     // Create DPO payment token and store associated data
//     const { token, courseId, chapterId } = await createToken(amount, serviceType, params);
//     console.log('Token creation result:', { token, courseId, chapterId }); // Debug log

//     // Temporarily store the token and its associated data in the database
//     await db.pendingTransaction.create({
//       data: {
//         dpoToken: token,
//         courseId: courseId,
//         chapterId: chapterId, // Ensure chapterId is passed here
//         amount: amount,
//         serviceType: serviceType,
//       },
//     });

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<{ token: string; courseId: string; chapterId: string }> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   console.log('Incoming GET request URL:', url.href); // Debug log

//   const token = url.searchParams.get('token');

//   if (!token) {
//     return new NextResponse("Missing token parameter", { status: 400 });
//   }

//   try {
//     // Verify the payment with DPO
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       // User Authentication
//       const user = await currentUser();
//       if (!user || !user.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//       // Retrieve pending transaction data using the token
//       const pendingTransaction = await db.pendingTransaction.findUnique({
//         where: { dpoToken: token },
//       });

//       if (!pendingTransaction) {
//         return new NextResponse("No pending transaction found", { status: 404 });
//       }

//       const { courseId, chapterId, amount } = pendingTransaction;

//       // Check if course exists and is published
//       const course = await db.course.findUnique({
//         where: {
//           id: courseId,
//           isPublished: true,
//         },
//       });

//       if (!course) {
//         return new NextResponse("Course not found", { status: 404 });
//       }

//       // Create Transaction
//       const transaction = await db.transaction.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           amount: amount,
//           dpoToken: token,
//           status: 'COMPLETED',
//         },
//       });

//       // Create Purchase
//       const purchase = await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           transactionId: transaction.id,
//         },
//       });

//       // Optionally update user progress
//       await db.userProgress.upsert({
//         where: {
//           userId_chapterId: {
//             userId: user.id,
//             chapterId: chapterId,
//           },
//         },
//         update: {
//           isCompleted: false,
//         },
//         create: {
//           userId: user.id,
//           chapterId: chapterId,
//           courseId: courseId,
//           isCompleted: false,
//         },
//       });

//       // Clean up the pending transaction
//       await db.pendingTransaction.delete({
//         where: { dpoToken: token },
//       });

//       // Redirect to success page
//       return NextResponse.redirect(`${baseURL}/course/${courseId}/chapters/${chapterId}?success=true`);
//     } else {
//       // Payment failed, clean up pending transaction and redirect to failure page
//       await db.pendingTransaction.deleteMany({
//         where: { dpoToken: token },
//       });
//       return NextResponse.redirect(`${baseURL}/payment-failed?token=${token}`);
//     }

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment verification:', error);
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
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//  // const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout`;
//     const redirectUrl = `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}`;

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
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return {
//         token: parsedResponse.API3G.TransToken,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//       };
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     console.error('DPO API Error:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
//     throw new Error('Failed to create payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string } }) {
//   const { price, serviceType, chapterId } = await req.json();

//   console.log('POST params:', params);
//   console.log('Request body:', { price, serviceType, chapterId });

//   try {
//     if (!price) throw new Error('Price is not provided');
//     if (!chapterId) throw new Error('ChapterId is missing from request body');

//     const amount = price;

//     const { token, courseId, chapterId: cid } = await createToken(amount, serviceType, {
//       courseId: params.courseId,
//       chapterId,
//     });

//     await db.pendingTransaction.create({
//       data: {
//         dpoToken: token,
//         courseId,
//         chapterId: cid,
//         amount,
//         serviceType,
//       },
//     });

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     console.error('Error in payment processing:', error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
//       { status: 500 }
//     );
//   }
// }

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' && parsedResponse.API3G.Status === 'CAPTURED') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation || 'Payment not captured'}`);
//     }

//   } catch (error) {
//     console.error('DPO API Error:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   console.log('Incoming GET request URL:', url.href);
//   const token = url.searchParams.get('token'); // if applicable
//   return NextResponse.json({ message: 'GET handler not implemented' });
// }










// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';
// //const baseURL = 'http://localhost:3000/'
// const SUCCESS_REDIRECT = '/payment-success';
// const FAILURE_REDIRECT = '/payment-failure';

// const createToken = async (
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}`;

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
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return {
//         token: parsedResponse.API3G.TransToken,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//       };
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     console.error('DPO API Error:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
//     throw new Error('Failed to create payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string } }) {
//   const { price, serviceType, chapterId } = await req.json();

//   console.log('POST params:', params);
//   console.log('Request body:', { price, serviceType, chapterId });

//   try {
//     if (!price) throw new Error('Price is not provided');
//     if (!chapterId) throw new Error('ChapterId is missing from request body');

//     const amount = price;

//     const { token, courseId, chapterId: cid } = await createToken(amount, serviceType, {
//       courseId: params.courseId,
//       chapterId,
//     });

//     await db.pendingTransaction.create({
//       data: {
//         dpoToken: token,
//         courseId,
//         chapterId: cid,
//         amount,
//         serviceType,
//       },
//     });

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     console.error('Error in payment processing:', error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
//       { status: 500 }
//     );
//   }
// }

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' && parsedResponse.API3G.Status === 'CAPTURED') {
//       return {
//         success: true,
//         transactionId: parsedResponse.API3G.TransactionID,
//         message: 'Payment successfully captured'
//       };
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation || 'Payment not captured'}`);
//     }

//   } catch (error) {
//     console.error('DPO API Error:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
//     throw new Error(`Failed to verify payment token: ${error instanceof Error ? error.message : 'Unknown error'}`);
//   }
// };

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   console.log('Incoming GET request URL:', url.href);
//   const token = url.searchParams.get('token');

//   if (!token) {
//     return NextResponse.json({ error: 'No token provided' }, { status: 400 });
//   }

//   try {
//     const user = await currentUser();
//     if (!user) {
//       throw new Error('User not authenticated');
//     }

//     const verificationResult = await verifyToken(token);

//     if (verificationResult.success) {
//       // Update transaction status
//       const transaction = await db.pendingTransaction.update({
//         where: { dpoToken: token },
//         data: {
//           status: 'COMPLETED',
//          // updatedAt: new Date(),
//         },
//       });

//       // Create purchase record
//       await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: transaction.courseId,
//           transactionId: transaction.id,
//         },
//       });

//       // Redirect to success page with course and chapter info
//       const successUrl = new URL(`${baseURL}/courses/${transaction.courseId}/chapters/${transaction.chapterId}`);
//       successUrl.searchParams.set('status', 'success');
//       successUrl.searchParams.set('message', 'Payment was successful');

//       return NextResponse.redirect(successUrl);

//     } else {
//       // Update transaction status to failed
//       await db.pendingTransaction.update({
//         where: { dpoToken: token },
//         data: {
//           status: 'FAILED',
//           //updatedAt: new Date(),
//         },
//       });

//       // Redirect to failure page with error message
//       const failureUrl = new URL(`${baseURL}/payment-failure`);
//       failureUrl.searchParams.set('status', 'failure');
//       failureUrl.searchParams.set('message', verificationResult.message || 'Payment failed');

//       return NextResponse.redirect(failureUrl);
//     }

//   } catch (error) {
//     console.error('Error in payment verification:', error);
    
//     // Update transaction status to failed
//     await db.pendingTransaction.update({
//       where: { dpoToken: token },
//       data: {
//         status: 'FAILED',
//        // updatedAt: new Date(),
//       },
//     });

//     const failureUrl = new URL(`${baseURL}/payment-failure`);
//     failureUrl.searchParams.set('status', 'failure');
//     failureUrl.searchParams.set('message', error instanceof Error ? error.message : 'An unexpected error occurred');

//     return NextResponse.redirect(failureUrl);
//   }
// }





import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
const COMPANY_TOKEN = process.env.COMPANY_TOKEN || '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

interface PaymentParams {
  courseId: string;
  chapterId: string;
}

// Token Creation Function
const createToken = async (
  amount: number | null | undefined,
  serviceType: number,
  params: PaymentParams
) => {
  if (amount == null) {
    throw new Error('Payment amount is not provided');
  }

  const formattedAmount = amount.toFixed(2);
  const serviceDate = new Date().toISOString().split('T')[0];
  const redirectUrl = `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}/payment-success`;
  //`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/${chapterId}/payment-success`

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

    const parsedResponse = new XMLParser().parse(response.data);

    if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
      return parsedResponse.API3G.TransToken;
    } else {
      throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('DPO API Error:', error.response?.data || error.message);
    } else {
      console.error('DPO API Error:', error);
    }
    throw new Error('Failed to create payment token');
  }
};

// Token Verification Function
const verifyToken = async (token: string) => {
  const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
    <API3G>
      <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
      <Request>verifyToken</Request>
      <TransactionToken>${token}</TransactionToken>
    </API3G>`;

  try {
    const response = await axios.post(DPO_API_URL, xmlPayload, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    const parsedResponse = new XMLParser().parse(response.data);

    if (parsedResponse.API3G.Result === '000') {
      return true;
    } else {
      throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('DPO API Error:', error.response?.data || error.message);
    } else {
      console.error('DPO API Error:', error);
    }
    throw new Error('Failed to verify payment token');
  }
};

async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      return await createToken(amount, serviceType, params);
    } catch (error) {
      if (i < retries - 1) {
        console.warn(`Attempt ${i + 1} failed. Retrying...`);
      } else {
        throw error;
      }
    }
  }
  throw new Error('Failed to create payment token after multiple attempts');
}

// Helper function to unlock chapters
// async function unlockChapters(userId: string, courseId: string, chapterId?: string) {
//   await db.chapterAccess.upsert({
//     where: {
//       userId_courseId_chapterId: {
//         userId: userId,
//         courseId: courseId,
//         chapterId: chapterId || '',
//       },
//     },
//     create: {
//       userId: userId,
//       courseId: courseId,
//       chapterId: chapterId || '',
//       isLocked: false,
//     },
//     update: {
//       isLocked: false,
//     },
//   });
// }

export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  const { price, serviceType } = await req.json();
  let tokenResponse;

  try {
    if (price == null) {
      throw new Error('Price is not provided');
    }

    const amount = price;

    // DPO Payment Token Creation with Retry
    const token = await createTokenWithRetry(amount, serviceType, params, 3);

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

    // Create transaction
    const transaction = await db.transaction.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
        amount: amount,
        dpoToken: token,
        status: 'PENDING',
      },
    }).catch((error) => {
      console.error('Failed to create transaction:', error);
      throw error;
    });

    console.log('Transaction created:', transaction);

    // Create purchase
    const purchase = await db.purchase.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
        transactionId: transaction.id,
      },
    }).catch((error) => {
      console.error('Failed to create purchase:', error);
      throw error;
    });

    console.log('Purchase created:', purchase);

    // Redirect to DPO payment page
    return NextResponse.json({
      url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in payment processing:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const courseId = url.searchParams.get('courseId');
  const chapterId = url.searchParams.get('chapterId');

  if (!token || !courseId || !chapterId) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  try {
    // Verify the token
    const isVerified = await verifyToken(token);

    if (!isVerified) {
      return new NextResponse("Payment verification failed", { status: 400 });
    }

    // Get the current user
    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Update transaction status to COMPLETED
    await db.transaction.update({
      where: {
        dpoToken: token,
      },
      data: {
        status: 'COMPLETED',
      },
    });

    // Update or create Purchase record
    let purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId,
        },
      },
    });

    if (!purchase) {
      purchase = await db.purchase.create({
        data: {
          userId: user.id,
          courseId: courseId,
          transactionId: token, // Use DPO token as transaction ID
        },
      });
    } else {
      purchase = await db.purchase.update({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId,
          },
        },
        data: {
          transactionId: token, // Update transaction ID
          updatedAt: new Date(),
        },
      });
    }

    // Unlock chapters
   // await unlockChapters(user.id, courseId, chapterId);

    // Redirect to the course chapter page
    return NextResponse.redirect(`${baseURL}/course/${courseId}/chapters/${chapterId}`);

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in payment verification:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
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
// const baseURL = 'http://localhost:3000/';
// const SUCCESS_REDIRECT = '/payment-success';
// const FAILURE_REDIRECT = '/payment-failure';

// const createToken = async (
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout`; // Updated to match DPO callback

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
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return {
//         token: parsedResponse.API3G.TransToken,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//       };
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     console.error('DPO API Error:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
//     throw new Error('Failed to create payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string } }) {
//   const { price, serviceType, chapterId } = await req.json();

//   console.log('POST params:', params);
//   console.log('Request body:', { price, serviceType, chapterId });

//   try {
//     if (!price) throw new Error('Price is not provided');
//     if (!chapterId) throw new Error('ChapterId is missing from request body');

//     const amount = price;

//     const { token, courseId, chapterId: cid } = await createToken(amount, serviceType, {
//       courseId: params.courseId,
//       chapterId,
//     });

//     await db.pendingTransaction.create({
//       data: {
//         dpoToken: token,
//         courseId,
//         chapterId: cid,
//         amount,
//         serviceType,
//       },
//     });

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     console.error('Error in payment processing:', error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
//       { status: 500 }
//     );
//   }
// }

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' && parsedResponse.API3G.Status === 'CAPTURED') {
//       return {
//         success: true,
//         transactionId: parsedResponse.API3G.TransactionID,
//         message: 'Payment successfully captured'
//       };
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation || 'Payment not captured'}`);
//     }

//   } catch (error) {
//     console.error('DPO API Error:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
//     throw new Error(`Failed to verify payment token: ${error instanceof Error ? error.message : 'Unknown error'}`);
//   }
// };

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   console.log('Incoming GET request URL:', url.href);
  
//   // Look for TransactionToken first, fall back to token
//   const transactionToken = url.searchParams.get('TransactionToken') || url.searchParams.get('token');

//   if (!transactionToken) {
//     return NextResponse.json({ error: 'No transaction token provided' }, { status: 400 });
//   }

//   try {
//     const user = await currentUser();
//     if (!user) {
//       throw new Error('User not authenticated');
//     }

//     const verificationResult = await verifyToken(transactionToken);

//     if (verificationResult.success) {
//       // Update transaction status
//       const transaction = await db.pendingTransaction.update({
//         where: { dpoToken: transactionToken },
//         data: {
//           status: 'COMPLETED',
//         },
//       });

//       // Create purchase record
//       await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: transaction.courseId,
//           transactionId: transaction.id,
//         },
//       });

//       // Redirect to success page with course and chapter info
//       const successUrl = new URL(`${baseURL}/courses/${transaction.courseId}/chapters/${transaction.chapterId}`);
//       successUrl.searchParams.set('status', 'success');
//       successUrl.searchParams.set('message', 'Payment was successful');

//       return NextResponse.redirect(successUrl);

//     } else {
//       // Update transaction status to failed
//       await db.pendingTransaction.update({
//         where: { dpoToken: transactionToken },
//         data: {
//           status: 'FAILED',
//         },
//       });

//       // Redirect to failure page with error message
//       const failureUrl = new URL(`${baseURL}/payment-failure`);
//       failureUrl.searchParams.set('status', 'failure');
//       failureUrl.searchParams.set('message', verificationResult.message || 'Payment failed');

//       return NextResponse.redirect(failureUrl);
//     }

//   } catch (error) {
//     console.error('Error in payment verification:', error);
    
//     // Update transaction status to failed
//     await db.pendingTransaction.update({
//       where: { dpoToken: transactionToken },
//       data: {
//         status: 'FAILED',
//       },
//     });

//     const failureUrl = new URL(`${baseURL}/payment-failure`);
//     failureUrl.searchParams.set('status', 'failure');
//     failureUrl.searchParams.set('message', error instanceof Error ? error.message : 'An unexpected error occurred');

//     return NextResponse.redirect(failureUrl);
//   }
// }



















// import { NextRequest, NextResponse } from 'next/server';
// import axios, { AxiosError } from 'axios'; // Import AxiosError
// import { XMLParser } from 'fast-xml-parser';
// import { db } from '@/lib/db';
// import { v4 as uuidv4 } from 'uuid';

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app';

// const createToken = async (
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string },
//   retries: number = 3 // Number of retries
// ) => {
//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//  // const redirectUrl = `${baseURL}/api/courses/${params.courseId}/chapters/${params.chapterId}/checkout`;
//   const redirectUrl = `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}`;

//   // Set CompanyRefUnique to '1' or '0' based on your logic
//   const companyRefUnique = '1'; // Change this to '0' if needed

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>${companyRefUnique}</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Course Payment</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsed = new XMLParser().parse(response.data);

//     // Check if the response indicates success (handle both string and number)
//     if (parsed.API3G?.Result === 0 || parsed.API3G?.Result === '000' || parsed.API3G?.Result === '0') {
//       return {
//         token: parsed.API3G.TransToken,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//       };
//     } else {
//       // Log the response for debugging
//       console.error('API Response:', parsed);
//       throw new Error(parsed.API3G?.ResultExplanation || 'DPO token creation failed');
//     }
//   } catch (error) {
//     const axiosError = error as AxiosError; // Type assertion
//     if (axiosError.response && axiosError.response.status === 429 && retries > 0) {
//       // Wait for a bit before retrying
//       const waitTime = Math.pow(2, 3 - retries) * 1000; // Exponential backoff
//       console.warn(`Rate limit hit, retrying in ${waitTime / 1000} seconds...`);
//       await new Promise(resolve => setTimeout(resolve, waitTime));
//       return createToken(amount, serviceType, params, retries - 1); // Retry
//     }
//     throw error; // Rethrow if not a 429 error or no retries left
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   const response = await axios.post(DPO_API_URL, xmlPayload, {
//     headers: { 'Content-Type': 'application/xml' },
//   });

//   const parsed = new XMLParser().parse(response.data);

//   if (parsed.API3G?.Result === '000' && parsed.API3G?.Status === 'CAPTURED') {
//     return true;
//   } else {
//     throw new Error(parsed.API3G?.ResultExplanation || 'Payment not captured');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string } }) {
//   try {
//     const { price, serviceType, chapterId, userId } = await req.json();

//     if (!price || !chapterId) {
//       return NextResponse.json({ error: 'Missing price or chapterId' }, { status: 400 });
//     }

//     const { token, courseId, chapterId: cid } = await createToken(price, serviceType, {
//       courseId: params.courseId,
//       chapterId,
//     });

//     const existing = await db.pendingTransaction.findFirst({
//       where: {
//         dpoToken: token,
//         courseId,
//         chapterId: cid,
//       },
//     });

//     if (existing) {
//       return NextResponse.json({
//         message: 'Transaction already exists',
//         url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//       });
//     }

//     await db.pendingTransaction.create({
//       data: {
//         dpoToken: token,
//         courseId,
//         chapterId: cid,
//         amount: price,
//         serviceType,
//         status: 'PENDING',
//         userId,
//       },
//     });

//     return NextResponse.json({
//       message: 'Transaction initiated',
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     const axiosError = error as AxiosError; // Type assertion
//     console.error('POST Error (Payment Init):', axiosError);
//     return NextResponse.json(
//       { error: 'Failed to initiate payment', details: axiosError.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
//   const url = new URL(req.url);

//   // Enhanced logging to debug parameter extraction
//   console.log('Full URL:', req.url);
//   console.log('Query Parameters:', Object.fromEntries(url.searchParams.entries()));

//   // Match the case of the query parameters as they appear in the URL
//   const transId = url.searchParams.get('TransID');
//   const transactionToken = url.searchParams.get('TransactionToken');
//   const approval = url.searchParams.get('CCDapproval');

//   const isEmpty = (val: string | null) => !val || val.trim() === '';

//   // Log the extracted parameters for debugging
//   console.log('Extracted Parameters:', { transId, transactionToken, approval });

//   if (isEmpty(transId) || isEmpty(transactionToken) || isEmpty(approval)) {
//     console.warn('Missing DPO redirect parameters:', {
//       transId,
//       transactionToken,
//       approval,
//     });
//     return NextResponse.json({ error: 'Missing parameters from DPO redirect' }, { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(transactionToken!);

//     if (isVerified) {
//       await db.pendingTransaction.updateMany({
//         where: { dpoToken: transactionToken! },
//         data: { status: 'COMPLETED', transId: transId! },
//       });

//       return NextResponse.redirect(`${baseURL}/courses/${params.courseId}?payment=success`);
//     } else {
//       await db.pendingTransaction.updateMany({
//         where: { dpoToken: transactionToken! },
//         data: { status: 'FAILED' },
//       });

//       return NextResponse.redirect(`${baseURL}/courses/${params.courseId}?payment=failed`);
//     }
//   } catch (error) {
//     const axiosError = error as AxiosError; // Type assertion
//     console.error('GET Error (DPO Verification):', axiosError);

//     await db.pendingTransaction.updateMany({
//       where: { dpoToken: transactionToken! },
//       data: { status: 'FAILED' },
//     });

//     return NextResponse.redirect(`${baseURL}/courses/${params.courseId}?payment=failed`);
//   }
// }









// import { NextRequest, NextResponse } from 'next/server';
// import axios, { AxiosError } from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { db } from '@/lib/db';

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app';

// const createToken = async (
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string },
//   retries: number = 3
// ) => {
//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}`;

//   const companyRefUnique = '1'; // Change to '0' if needed

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>${companyRefUnique}</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Course Payment</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsed = new XMLParser().parse(response.data);

//     if (parsed.API3G?.Result === 0 || parsed.API3G?.Result === '000' || parsed.API3G?.Result === '0') {
//       return {
//         token: parsed.API3G.TransToken,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//       };
//     } else {
//       console.error('API Response:', parsed);
//       throw new Error(parsed.API3G?.ResultExplanation || 'DPO token creation failed');
//     }
//   } catch (error) {
//     const axiosError = error as AxiosError;
//     if (axiosError.response?.status === 429 && retries > 0) {
//       const waitTime = Math.pow(2, 3 - retries) * 1000;
//       console.warn(`Rate limit hit, retrying in ${waitTime / 1000} seconds...`);
//       await new Promise(resolve => setTimeout(resolve, waitTime));
//       return createToken(amount, serviceType, params, retries - 1);
//     }
//     throw error;
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   const response = await axios.post(DPO_API_URL, xmlPayload, {
//     headers: { 'Content-Type': 'application/xml' },
//   });

//   const parsed = new XMLParser().parse(response.data);

//   if (parsed.API3G?.Result === '000' && parsed.API3G?.Status === 'CAPTURED') {
//     return true;
//   } else {
//     throw new Error(parsed.API3G?.ResultExplanation || 'Payment not captured');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string } }) {
//   try {
//     const body = await req.json();
//     console.log('Request Body:', body);

//     const { price, serviceType, chapterId, userId } = body;

//     // Validate required fields
//     if (!price || !serviceType || !chapterId || !userId) {
//       console.error('Missing required fields:', { price, serviceType, chapterId, userId });
//       return NextResponse.json(
//         { error: 'Missing price, serviceType, chapterId, or userId' },
//         { status: 400 }
//       );
//     }

//     const { token, courseId, chapterId: cid } = await createToken(price, serviceType, {
//       courseId: params.courseId,
//       chapterId,
//     });

//     const existing = await db.pendingTransaction.findFirst({
//       where: {
//         dpoToken: token,
//         courseId,
//         chapterId: cid,
//       },
//     });

//     if (existing) {
//       return NextResponse.json({
//         message: 'Transaction already exists',
//         url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//       });
//     }

//     await db.pendingTransaction.create({
//       data: {
//         dpoToken: token,
//         courseId,
//         chapterId: cid,
//         amount: price,
//         serviceType,
//         status: 'PENDING',
//         userId,
//       },
//     });

//     return NextResponse.json({
//       message: 'Transaction initiated',
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     const axiosError = error as AxiosError;
//     console.error('POST Error (Payment Init):', axiosError);
//     return NextResponse.json(
//       { error: 'Failed to initiate payment', details: axiosError.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
//   const url = new URL(req.url);
//   console.log('Full URL:', req.url);
//   console.log('Query Parameters:', Object.fromEntries(url.searchParams.entries()));

//   const transId = url.searchParams.get('TransID');
//   const transactionToken = url.searchParams.get('TransactionToken');
//   const approval = url.searchParams.get('CCDapproval');

//   if (!transId || !transactionToken || !approval) {
//     console.warn('Missing DPO redirect parameters:', { transId, transactionToken, approval });
//     return NextResponse.json({ error: 'Missing parameters from DPO redirect' }, { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(transactionToken);

//     if (isVerified) {
//       const pendingTransaction = await db.pendingTransaction.findUnique({
//         where: { dpoToken: transactionToken },
//       });

//       if (!pendingTransaction) {
//         console.error('Pending transaction not found for token:', transactionToken);
//         return NextResponse.json({ error: 'Pending transaction not found' }, { status: 404 });
//       }

//       await db.pendingTransaction.updateMany({
//         where: { dpoToken: transactionToken },
//         data: { status: 'COMPLETED', transId },
//       });

//       await db.purchase.create({
//         data: {
//           courseId: pendingTransaction.courseId,
//           userId: pendingTransaction.userId,
//           transactionId: transId,
//         },
//       });

//       return NextResponse.redirect(`${baseURL}/courses/${params.courseId}?payment=success`);
//     } else {
//       await db.pendingTransaction.updateMany({
//         where: { dpoToken: transactionToken },
//         data: { status: 'FAILED' },
//       });

//       return NextResponse.redirect(`${baseURL}/courses/${params.courseId}?payment=failed`);
//     }
//   } catch (error) {
//     const axiosError = error as AxiosError;
//     console.error('GET Error (DPO Verification):', axiosError);

//     await db.pendingTransaction.updateMany({
//       where: { dpoToken: transactionToken },
//       data: { status: 'FAILED' },
//     });

//     return NextResponse.redirect(`${baseURL}/courses/${params.courseId}?payment=failed`);
//   }
// }