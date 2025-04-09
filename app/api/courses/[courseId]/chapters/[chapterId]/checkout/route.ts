





// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { revalidatePath } from 'next/cache';

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = process.env.COMPANY_TOKEN || '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// interface PaymentParams {
//   courseId: string;
//   chapterId: string;
// }

// // Token Creation Function
// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: PaymentParams
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}`; // Updated to point to GET endpoint

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

// // Token Verification Function
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

//     // Create transaction with PENDING status before payment
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: null, // Will be updated later
//         status: 'PENDING',
//       },
//     });

//     // DPO Payment Token Creation with Retry
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     // Update the transaction with the DPO token
//     await db.transaction.update({
//       where: { id: transaction.id },
//       data: { dpoToken: token },
//     });

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}&transactionId=${transaction.id}`,
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
//   const transactionId = url.searchParams.get('transactionId');

//   if (!token || !courseId || !chapterId || !transactionId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     // Verify the token (ensure payment was successful)
//     const isVerified = await verifyToken(token);

//     if (!isVerified) {
//       // Update transaction status to FAILED if verification fails
//       await db.transaction.update({
//         where: { id: transactionId },
//         data: { status: 'FAILED' },
//       });
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     // Get the current user
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Update transaction status to COMPLETED
//     const updatedTransaction = await db.transaction.update({
//       where: { id: transactionId },
//       data: {
//         status: 'COMPLETED',
//         dpoToken: token, // Ensure DPO token is stored
//       },
//     });

//     // Create purchase after successful payment
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: courseId,
//         transactionId: updatedTransaction.id,
//       },
//     });

//     console.log('Transaction updated and Purchase created after successful DPO payment:', { transaction: updatedTransaction, purchase });

//     // Revalidate the chapter page to ensure UI updates
//     revalidatePath(`/courses/${courseId}/chapters/${chapterId}`);

//     // Redirect to the payment success page
//     return NextResponse.redirect(
//       `${baseURL}/courses/${courseId}/chapters/${chapterId}/payment-success`
//     );

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










import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

const createToken = async (
  amount: number | null,
  serviceType: number,
  params: { courseId: string; chapterId: string }
) => {
  if (amount == null) {
    throw new Error('Payment amount is not provided');
  }

  const formattedAmount = amount.toFixed(2);
  const serviceDate = new Date().toISOString().split('T')[0];
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

    const parsedResponse = new XMLParser().parse(response.data);

    if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
      return parsedResponse.API3G.TransToken;
    } else {
      throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('DPO API Error:', error.response?.data || error.message);
    } else {
      console.error('DPO API Error:', error);
    }
    throw new Error('Failed to create payment token');
  }
};

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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('DPO API Error:', error.response?.data || error.message);
    } else {
      console.error('DPO API Error:', error);
    }
    throw new Error('Failed to verify payment token');
  }
};

export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  const { price, serviceType } = await req.json();

  try {
    if (price == null) {
      throw new Error('Price is not provided');
    }

    const amount = price;

    const token = await createTokenWithRetry(amount, serviceType, params, 3);

    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

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

    const transaction = await db.transaction.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
        amount: amount,
        dpoToken: token,
        status: 'PENDING',
      },
    }).catch((error: unknown) => {
      console.error('Failed to create transaction:', error);
      throw error;
    });

    console.log('Transaction created:', transaction);

    return NextResponse.json({
      url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
    });
  } catch (error: unknown) {
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
    const isVerified = await verifyToken(token);

    if (isVerified) {
      const transaction = await db.transaction.update({
        where: {
          dpoToken: token,
        },
        data: {
          status: 'COMPLETED',
        },
      });

      console.log('Transaction updated:', transaction);

      const user = await currentUser();
      if (!user || !user.id) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const existingPurchase = await db.purchase.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId,
          },
        },
      });

      if (existingPurchase) {
        return new NextResponse("Already Purchased", { status: 400 });
      }

      const purchase = await db.purchase.create({
        data: {
          userId: user.id,
          courseId: courseId,
          transactionId: transaction.id,
        },
      }).catch((error: unknown) => {
        console.error('Failed to create purchase:', error);
        throw error;
      });

      console.log('Purchase created:', purchase);

      return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
    } else {
      return new NextResponse("Payment verification failed", { status: 400 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in payment verification:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}

async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      return await createToken(amount, serviceType, params);
    } catch (error: unknown) {
      if (i < retries - 1) {
        console.warn(`Attempt ${i + 1} failed. Retrying...`);
      } else {
        throw error;
      }
    }
  }
  throw new Error('Failed to create payment token after multiple attempts');
}
