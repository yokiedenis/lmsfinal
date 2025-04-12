// 'use client';

// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import  styles  from '@/styles/Certificate.module.css';

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId?: string;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase()
// }) => {
//   const certificateRef = useRef<HTMLDivElement>(null);

//   // const handleDownloadPDF = useReactToPrint({
//   //   content: () => certificateRef.current, // Updated from pageContent to content
//   //   pageStyle: `
//   //     @page {
//   //       size: A4 landscape;
//   //       margin: 0;
//   //     }
//   //     @media print {
//   //       body, html {
//   //         width: 297mm;
//   //         height: 210mm;
//   //       }
//   //     }
//   //   `,
//   //   documentTitle: `${recipientName}_${courseName}_Certificate`,
//   //   removeAfterPrint: true
//   // });

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     //handleDownloadPDF();
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.downloadContainer}>
//         <button onClick={handleButtonClick} className={styles.downloadButton}>
//           Download PDF Certificate
//         </button>
//       </div>
      
//       <div className={styles.certificateContainer} ref={certificateRef}>
//         <div className={styles.certificateBorder}>
//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//                 <div className={styles.seal}>
//                   <div className={styles.sealInner}>
//                     <span>Skill Today, Lead Tomorrow</span>
//                   </div>
//                 </div>
//                 <h2
//                                 className={styles.certificateTitle}
//                                 style={{
//                                   backgroundColor: 'white',
//                                   display: 'inline-block',
//                                   padding: '4rem 2rem',
//                                   borderRadius: '6px',
//                                   fontSize:'40px',
//                                 }}
//                               >
//                                <div> CERTIFICATE OF COMPLETION</div>
//                  </h2>
 
//           </div>


//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that {recipientName}  has successfully completed</p>
//             <h3 className={styles.recipientName}>{recipientName}</h3>
             
//             <div className={styles.courseName}>{courseName}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               {/* <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div> */}
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{date}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Authorized Signature</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             <div className={styles.qrPlaceholder}></div>
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;







// 'use client';

// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { useUser } from '@clerk/clerk-react';
// import styles from '@/styles/Certificate.module.css';
// //import  QRCode  from 'qrcode.react'; // You'll need to install this package: npm install qrcode.react

// interface CertificateProps {
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId?: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseName,
//   date: propDate, // We'll override this with the current date
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);

//   // Get current date for the certificate
//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

 
//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//      // handleDownloadPDF();
//     }
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   // QR Code data (you can customize this to link to a verification page)
//   const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${courseName}`;

//   return (
//     <div className={styles.container}>
//       <div className={styles.downloadContainer}>
//         <button 
//           onClick={handleButtonClick} 
//           className={`${styles.downloadButton} ${locked ? styles.lockedButton : ''}`}
//         >
//           {locked ? 'Unlock Certificate' : 'Download PDF Certificate'}
//         </button>
//         {locked && (
//           <p className={styles.lockedMessage}>
//             Complete the quiz with a passing score to unlock your certificate
//           </p>
//         )}
//       </div>
      
//       <div 
//         className={`${styles.certificateContainer} ${locked ? styles.lockedCertificate : ''}`} 
//         ref={certificateRef}
//       >
//         {locked && (
//           <div className={styles.lockOverlay}>
//             <div className={styles.lockIcon}>🔒</div>
//             <p>Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}
        
//         <div className={styles.certificateBorder}>
//           {/* Logo in the top left */}
//           <img 
//             src="/logon.png" // Replace with the actual path to your logo image
//             alt="Logo"
//             className={styles.logo}
//           />

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <div className={styles.seal}>
            
//               <div className={styles.sealInner}>
//               <span>Eduskill</span>
//               </div>
//             </div>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
//               }}
//             >
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseName}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p> {/* Using current date */}
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//             {currentDate}
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {/* <QRCode value={qrData} size={100} className={styles.qrCode} /> QR Code */}
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;








// "use client";

// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { useUser } from '@clerk/clerk-react';
// import styles from '@/styles/Certificate.module.css';

// interface CertificateProps {
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId?: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseName,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     }
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${courseName}`;

//   return (
//     <div className={styles.container}>
//       <div className={styles.downloadContainer}>
//         <button 
//           onClick={handleButtonClick} 
//           className={`${styles.downloadButton} ${locked ? styles.lockedButton : ''}`}
//         >
//           {locked ? 'Unlock Certificate' : 'Download PDF Certificate'}
//         </button>
//         {locked && (
//           <p className={styles.lockedMessage}>
//             Complete the quiz with a passing score to unlock your certificate
//           </p>
//         )}
//       </div>
      
//       <div 
//         className={`${styles.certificateContainer} ${locked ? styles.lockedCertificate : ''}`} 
//         ref={certificateRef}
//       >
//         {locked && (
//           <div className={styles.lockOverlay}>
//             <div className={styles.lockIcon}>🔒</div>
//             <p>Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}
        
//         <div className={styles.certificateBorder}>
//           {/* Logo and Seal aligned horizontally using flex */}
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/logon.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
//               }}
//             >
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseName}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               {currentDate}
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {/* <QRCode value={qrData} size={100} className={styles.qrCode} /> */}
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;







// "use client";

// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { useUser } from '@clerk/clerk-react';
// import styles from '@/styles/Certificate.module.css';

// interface CertificateProps {
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId?: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseName,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     }
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${courseName}`;

//   return (
//     <div className={styles.container}>
//       <div className={styles.downloadContainer}>
//         <button 
//           onClick={handleButtonClick} 
//           className={`${styles.downloadButton} ${locked ? styles.lockedButton : ''}`}
//         >
//           {locked ? 'Unlock Certificate' : 'Download PDF Certificate'}
//         </button>
//         {locked && (
//           <p className={styles.lockedMessage}>
//             Complete the quiz with a passing score to unlock your certificate
//           </p>
//         )}
//       </div>
      
//       <div 
//         className={`${styles.certificateContainer} ${locked ? styles.lockedCertificate : ''}`} 
//         ref={certificateRef}
//       >
//         {locked && (
//           <div className={styles.lockOverlay}>
//             <div className={styles.lockIcon}>🔒</div>
//             <p>Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}
        
//         <div className={styles.certificateBorder}>
//           {/* Logo and Seal aligned horizontally using flex */}
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/logon.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
//               }}
//             >
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseName}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               {currentDate}
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {/* <QRCode value={qrData} size={100} className={styles.qrCode} /> */}
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;








"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useUser } from '@clerk/clerk-react';
import { useSearchParams } from 'next/navigation';
import styles from '@/styles/Certificate.module.css';
import { getCourses } from '@/actions/get-courses';

interface CertificateProps {
  courseTitle: string;
  date: string;
  issuerName?: string;
  score?: number;
  certificateId?: string;
  locked?: boolean;
  onUnlockRequest?: () => void;
}

const Certificate: React.FC<CertificateProps> = ({
  courseTitle,
  date: propDate,
  issuerName = "EDUSKILL ONLINE LEARNING",
  score,
  certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
  locked = false,
  onUnlockRequest
}) => {
  const { user } = useUser();
  const certificateRef = useRef<HTMLDivElement>(null);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (locked) {
      onUnlockRequest?.();
    }
  };

  if (!user) {
    return <div className={styles.container}>Please sign in to view your certificate.</div>;
  }

  const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${courseTitle}`;

  return (
    <div className={styles.container}>
      <div className={styles.downloadContainer}>
        <button 
          onClick={handleButtonClick} 
          className={`${styles.downloadButton} ${locked ? styles.lockedButton : ''}`}
        >
          {locked ? 'Unlock Certificate' : 'Download PDF Certificate'}
        </button>
        {locked && (
          <p className={styles.lockedMessage}>
            Complete the quiz with a passing score to unlock your certificate
          </p>
        )}
      </div>
      
      <div 
        className={`${styles.certificateContainer} ${locked ? styles.lockedCertificate : ''}`} 
        ref={certificateRef}
      >
        {locked && (
          <div className={styles.lockOverlay}>
            <div className={styles.lockIcon}>🔒</div>
            <p>Certificate Locked</p>
            <p>Complete the quiz to unlock</p>
          </div>
        )}
        
        <div className={styles.certificateBorder}>
          <div className={styles.headerAlignment}>
            <img 
              src="/logon.png" 
              alt="Logo"
              className={styles.logoPadding}
            />
            <div className={styles.seal}>
              <div className={styles.sealInner}>
                <span>Eduskill</span>
              </div>
            </div>
          </div>

          <div className={styles.cornerDecorationTopLeft}></div>
          <div className={styles.cornerDecorationTopRight}></div>
          <div className={styles.cornerDecorationBottomLeft}></div>
          <div className={styles.cornerDecorationBottomRight}></div>
          
          <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
          <div className={styles.certificateHeader}>
            <h2
              className={styles.certificateTitle}
              style={{
                backgroundColor: 'white',
                display: 'inline-block',
                padding: '4rem 2rem',
                borderRadius: '6px',
                fontSize: '40px',
              }}
            >
              <div>CERTIFICATE OF COMPLETION</div>
            </h2>
          </div>

          <div className={styles.certificateBody}>
            <p className={styles.presentedTo}>This is to certify that</p>
            <h3 className={styles.recipientName}>{user.fullName}</h3>
            <p className={styles.presentedTo}>has successfully completed</p>
            <div className={styles.courseName}>{courseTitle}</div>
            
            {score !== undefined && (
              <div className={styles.scoreContainer}>
                <p>Achieving an outstanding score of</p>
                <div className={styles.scoreBadge}>{score}%</div>
              </div>
            )}

            <div className={styles.detailsContainer}>
              <div className={styles.detailBox}>
                <p className={styles.detailLabel}>Date of Completion</p>
                <p className={styles.detailValue}>{currentDate}</p>
              </div>
            </div>
          </div>

          <div className={styles.signatureSection}>
            <div className={styles.signatureBlock}>
              <div className={styles.signatureLine}></div>
              <p className={styles.signatureLabel}>Shivani Jobanputra</p>
            </div>
            <div className={styles.signatureBlock}>
              {currentDate}
              <div className={styles.signatureLine}></div>
              <p className={styles.signatureLabel}>Date</p>
            </div>
          </div>

          <div className={styles.issuerSection}>
            <p className={styles.issuerName}>{issuerName}</p>
            <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
          </div>

          <div className={styles.verification}>
            <p>Scan to verify authenticity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GraduationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseTitle = async () => {
      try {
        const courseId = searchParams.get('courseId');
        const courseTitleParam = searchParams.get('courseTitle');

        console.log('Query Params:', {
          courseId,
          courseTitleParam,
          decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
        });

        if (!user?.id) {
          console.warn('No user ID available, using default course title.');
          setCourseTitle('Default Course Title');
          setIsLoading(false);
          return;
        }

        const courses = await getCourses({ userId: user.id });

        console.log('Fetched courses:', courses);

        if (courseId) {
          const course = courses.find((c) => c.id === courseId);
          if (course) {
            setCourseTitle(course.title);
            console.log('Set courseTitle from courseId:', course.title);
          } else {
            console.warn('Course not found for courseId:', courseId);
            if (courseTitleParam) {
              setCourseTitle(decodeURIComponent(courseTitleParam));
              console.log('Fallback to courseTitle from query param:', decodeURIComponent(courseTitleParam));
            }
          }
        } else if (courseTitleParam) {
          setCourseTitle(decodeURIComponent(courseTitleParam));
          console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
        } else {
          console.warn('No courseId or courseTitle provided in query params.');
          setCourseTitle('Default Course Title');
        }
      } catch (error) {
        console.error('Error fetching course title:', error);
        setCourseTitle('Default Course Title');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseTitle();
  }, [searchParams, user]);

  if (isLoading) {
    return <div>Loading certificate...</div>;
  }

  return <Certificate courseTitle={courseTitle} date="" issuerName="EDUSKILL ONLINE LEARNING" locked={false} />;
};

export default GraduationPage;