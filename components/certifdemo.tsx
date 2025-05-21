 // app/components/Certificate.tsx

// import Image from "next/image";

// export default function Certificate() {
//   return (
//     <div className="max-w-4xl mx-auto p-10 bg-white border-4 border-gray-200 shadow-xl rounded-lg relative text-center font-serif">
//       {/* Badge Ribbon */}
//       <div className="absolute top-6 left-6">
//         <Image src="/images/badge.png" alt="Badge" width={80} height={80} />
//       </div>

//       {/* Logo */}
//       <div className="flex justify-center items-center mb-4">
//         <Image src="/images/logo.png" alt="Pic-Ed Logo" width={100} height={100} />
//       </div>

//       <h1 className="text-4xl font-bold mb-1">CERTIFICATE</h1>
//       <h2 className="text-2xl text-purple-600 tracking-wide mb-6">DATA ANALYST</h2>

//       <p className="text-lg uppercase mb-6 text-gray-700 font-medium tracking-widest">
//         The following certificate is given to
//       </p>

//       <h3 className="text-2xl font-bold mb-4 border-b border-purple-500 inline-block px-8 py-2">
//         Ambrose Nigi
//       </h3>

//       <p className="text-md text-gray-700 mt-6 mb-10 max-w-2xl mx-auto">
//         This certificate is given to <strong>Ambrose Nigi</strong> for successfully completing the Data Analyst course
//         with Advanced Excel, PowerBI, Python & statistics tools
//       </p>

//       {/* Footer - Signatures */}
//       <div className="flex justify-between items-center mt-10 px-10">
//         <div>
//           <p className="font-bold">Benard Charles Ndege</p>
//           <p className="text-sm text-gray-600">Head Data Scientist</p>
//         </div>

//         {/* Center Emblem */}
//         <div className="text-center">
//           <div className="inline-block border-2 border-yellow-500 p-4 rounded-full">
//             <p className="text-sm font-bold text-purple-700">EDUSKILL</p>
//           </div>
//           <p className="text-sm text-gray-600 mt-1">2023</p>
//         </div>

//         <div>
//           <p className="font-bold">Lyllia Holly</p>
//           <p className="text-sm text-gray-600">Lead Data Scientist</p>
//         </div>
//       </div>
//     </div>
//   );
// }



// app/components/Certificate.tsx

// import Image from "next/image";
// import styles from '@/styles/Certificate.module.css';


// export default function Certificate() {
//   return (
//     <div className="relative max-w-4xl mx-auto p-10 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-hidden">

//       {/* 🎨 Top Left Triangle */}
//       <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-800 to-purple-500 clip-triangle-top-left z-0" />

//       {/* 🎨 Bottom Right Triangle */}
//       <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500 to-purple-700 clip-triangle-bottom-right z-0" />

//       {/* 🏅 Ribbon Badge */}
//       <div className="absolute top-6 left-6 z-10">
//         <Image src="/ribbonremover.png" alt="Badge" width={80} height={80} />
//       </div>

//       {/* 🔷 Logo */}
//       <div className="flex justify-center items-center mb-4 z-10 relative">
//         <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={100} height={100} />
//       </div>

//       <h1 className="text-4xl font-bold mb-1 z-10 relative">CERTIFICATE</h1>
//       <h2 className="text-2xl text-purple-600 tracking-wide mb-6 z-10 relative">DATA ANALYST</h2>

//       <p className="text-lg uppercase mb-6 text-gray-700 font-medium tracking-widest z-10 relative">
//         The following certificate is given to
//       </p>

//       <h3 className="text-2xl font-bold mb-4 border-b border-purple-500 inline-block px-8 py-2 z-10 relative">
//         Ambrose Nigi
//       </h3>

//       <p className="text-md text-gray-700 mt-6 mb-10 max-w-2xl mx-auto z-10 relative">
//         This certificate is given to <strong>Ambrose Nigi</strong> for successfully completing the Data Analyst course
//         with Advanced Excel, PowerBI, Python & statistics tools
//       </p>

//       {/* 🔏 Footer */}
//       <div className="flex justify-between items-center mt-10 px-10 z-10 relative">
//         <div>
//           <p className="font-bold">Benard Charles Ndege</p>
//           <p className="text-sm text-gray-600">Head Data Scientist</p>
//         </div>

//         {/* Emblem */}
//         <div className="text-center">
//           <div className="inline-block border-2 border-yellow-500 p-4 rounded-full">
//             <p className="text-sm font-bold text-purple-700">EDUSKILL</p>
//           </div>
//           <p className="text-sm text-gray-600 mt-1">2025</p>
//         </div>

//         <div>
//           <p className="font-bold">Lyllia Holly</p>
//           <p className="text-sm text-gray-600">Lead Data Scientist</p>
//         </div>
//       </div>
//     </div>
//   );
// }



// // app/components/Certificate.tsx

// import Image from "next/image";
// import styles from '@/styles/Certificate.module.css';

// export default function Certificate() {
//   return (
//     <div className="relative max-w-4xl mx-auto p-10 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-hidden">

//       {/* 🎨 Top Left Corner: Two Overlapping Triangles */}
//       <div className="absolute top-0 left-0 w-40 h-40 z-0">
//         <div className="absolute w-full h-full bg-blue-600 clip-triangle-top-left z-0" />
//         <div className="absolute w-full h-full bg-purple-800 clip-triangle-top-left-smaller z-10" />
//       </div>

//       {/* 🎨 Bottom Right Corner: Two Overlapping Triangles */}
//       {/* <div className="absolute bottom-0 right-0 w-40 h-40 z-0">
//         <div className="absolute w-full h-full bg-blue-600 clip-triangle-bottom-right z-0" />
//         <div className="absolute w-full h-full bg-purple-700 clip-triangle-bottom-right-smaller z-10" />
//       </div> */}
        
//         {/* 🎨 Bottom Right Corner: Two Overlapping Triangles */}
//         <div className="absolute bottom-0 right-0 w-40 h-40 z-0">
//           <div className="absolute w-full h-full bg-blue-600 clip-triangle-bottom-right z-0" />
//           <div className="absolute w-full h-full bg-purple-700 clip-triangle-bottom-right-smaller z-10" />
//         </div>





//       {/* 🏅 Ribbon Badge */}
//       <div className="absolute top-6 left-6 z-20">
//         <Image src="/ribbonremover.png" alt="Badge" width={80} height={80} />
//       </div>

//       {/* 🔷 Logo */}
//       <div className="flex justify-center items-center mb-4 z-10 relative">
//         <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={100} height={100} />
//       </div>

//      <h2 className="text-5xl font-bold mb-1 z-10 relative bg-white inline-block px-4">CERTIFICATE</h2>

//       <h2 className="text-2xl text-purple-600 tracking-wide mb-6 z-10 relative">DATA ANALYST</h2>

//       <p className="text-lg uppercase mb-6 text-gray-700 font-medium tracking-widest z-10 relative">
//         The following certificate is given to
//       </p>

//       <h3 className="text-2xl font-bold mb-4 border-b border-purple-500 inline-block px-8 py-2 z-10 relative">
//         Ambrose Nigi
//       </h3>

//       <p className="text-md text-gray-700 mt-6 mb-10 max-w-2xl mx-auto z-10 relative">
//         This certificate is given to <strong>Ambrose Nigi</strong> for successfully completing the Data Analyst course
//         with Advanced Excel, PowerBI, Python & statistics tools
//       </p>

//       {/* 🔏 Footer */}
//       <div className="flex justify-between items-center mt-10 px-10 z-10 relative">
//         <div>
//           <div className="border-t border-purple-500 w-40 mb-1 mx-auto"></div>
//           <p className="font-bold ">Benard Charles Ndege</p>
//           <p className="text-sm text-gray-600">Head Data Scientist</p>
//         </div>

//         <div className="text-center">
//          <div className=" ">
//           <Image src="/cert.png" alt="Eduskill Logo" width={80} height={60} />
//                 </div>

//           <p className="text-sm text-gray-600 mt-1">2025</p>
//         </div>

//         <div>
//           <div className="border-t border-purple-500 w-40 mb-1 mx-auto"></div>
//           <p className="font-bold">Lyllia Holly</p>
//           <p className="text-sm text-gray-600">Lead Data Scientist</p>
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// //import styles from "@/styles/Certificate.module.css";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

//   // Use provided date or fallback to current date
//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   // Generate QR code for verification
//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 100, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       // Set fixed dimensions for A4 landscape in pixels (at 96dpi, 1mm ≈ 3.78px)
//       const pdfWidth = 297 * 3.78; // A4 width in pixels (landscape)
//       const pdfHeight = 210 * 3.78; // A4 height in pixels (landscape)

//       // Temporarily set the certificate container to match A4 landscape dimensions
//       certificateRef.current.style.width = `${pdfWidth}px`;
//       certificateRef.current.style.height = `${pdfHeight}px`;

//       // Ensure the background is applied
//       certificateRef.current.style.backgroundColor = "#fff"; // White background

//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 1,
//         width: pdfWidth,
//         height: pdfHeight,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#fff",
//         removeContainer: true,
//       });

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: "a4",
//       });

//       // Add the image to the PDF, fitting the A4 dimensions
//       pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
//       pdf.save(`${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);

//       // Reset the dimensions after generating the PDF
//       certificateRef.current.style.width = "";
//       certificateRef.current.style.height = "";
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-10">
//       <div className="flex justify-center mb-6 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative max-w-4xl mx-auto p-10 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-hidden ${
//           locked ? "opacity-50" : ""
//         }`}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* 🎨 Top Left Corner: Two Overlapping Triangles */}
//         <div className="absolute top-0 left-0 w-40 h-40 z-0">
//           <div className="absolute w-full h-full bg-blue-600 clip-triangle-top-left z-0" />
//           <div className="absolute w-full h-full bg-purple-800 clip-triangle-top-left-smaller z-10" />
//         </div>

//         {/* 🎨 Bottom Right Corner: Two Overlapping Triangles */}
//         <div className="absolute bottom-0 right-0 w-40 h-40 z-0">
//           <div className="absolute w-full h-full bg-blue-600 clip-triangle-bottom-right z-0" />
//           <div className="absolute w-full h-full bg-purple-700 clip-triangle-bottom-right-smaller z-10" />
//         </div>

//         {/* 🏅 Ribbon Badge */}
//         <div className="absolute top-6 left-6 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={80} height={80} />
//         </div>

//         {/* 🔷 Logo */}
//         <div className="flex justify-center items-center mb-4 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={100} height={100} />
//         </div>

//        <h2 className="text-5xl font-bold mb-1 z-10 relative bg-white inline-block px-4"
//               style={{ color: 'black' }}   >
//               CERTIFICATE
//          </h2>

//         <h2 className="text-2xl text-purple-600 tracking-wide mb-6 z-10 relative">{courseName}</h2>

//         <p className="text-lg uppercase mb-6 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3 className="text-2xl font-bold mb-4 border-b border-purple-500 inline-block px-8 py-2 z-10 relative"
//          style={{ color: 'blue',textTransform: 'uppercase'}} 
//         >
//           {recipientName}
//         </h3>

//         <p className="text-md text-gray-700 mt-6 mb-10 max-w-2xl mx-auto z-10 relative">
//           This certificate is given to <strong  style={{ color: 'blue'}}>{recipientName}</strong> for successfully completing the <strong style={{ color: 'black'}}> {courseName} </strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Additional Details */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           <div className="text-center">
//             <p className="text-sm font-bold"  style={{ color: 'black'}}>Certificate ID</p>
//             <p className="text-sm"  style={{ color: 'blue'}}>{certificateId}</p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           {qrCodeUrl ? (
//             <Image
//               src={qrCodeUrl}
//               alt="QR Code for Certificate Verification"
//               width={50}
//               height={50}
//             />
//           ) : (
//             <p>Generating QR code...</p>
//           )}
//         </div>

//         {/* 🔏 Footer */}
//         <div className="flex justify-between items-center mt-10 px-10 z-10 relative">
//           <div>
//             <div className="border-t border-purple-500 w-40 mb-1 mx-auto"></div>
//             <p className="font-bold"  style={{ color: 'blue',textTransform: 'uppercase'}}>SHIVANI JOBANPUTRA</p>
//             {/* <p className="text-sm text-gray-600">CEO/DIRECTOR</p> */}
//           </div>

//           <div className="text-center">
//             <div>
//               <Image src="/cert.png" alt="Eduskill Logo" width={90} height={60} />
//             </div>
//             {/* <p className="text-sm text-gray-600 mt-1">{displayDate}</p> */}
//           </div>

//           <div>
//             <p className="font-bold" style={{ color: 'black'}}>{displayDate}</p>
//             <div className="border-t font-bold border-purple-500 w-40 mb-1 mx-auto" style={{ color: 'blue'}}>DATE</div>
//             <p className="font-bold" style={{ color: 'blue',textTransform: 'uppercase'}}></p>
//             {/* <p className="text-sm text-gray-600">Lead Data Scientist</p> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;




// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 50, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const pdfWidthPx = 297 * 3.78; // A4 width in pixels (landscape, 1mm ≈ 3.78px at 96dpi)
//       const pdfHeightPx = 210 * 3.78; // A4 height in pixels (landscape)

//       certificateRef.current.style.width = `${pdfWidthPx}px`;
//       certificateRef.current.style.height = `${pdfHeightPx}px`;
//       certificateRef.current.style.backgroundColor = "#fff";

//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 1,
//         width: pdfWidthPx,
//         height: pdfHeightPx,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#fff",
//         removeContainer: true,
//       });

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: "a4",
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
//       pdf.save(`${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);

//       certificateRef.current.style.width = "";
//       certificateRef.current.style.height = "";
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-10">
//       <div className="flex justify-center mb-6 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[1122px] h-[793px] mx-auto p-10 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-hidden ${
//           locked ? "opacity-50" : ""
//         }`} // A4 landscape in pixels (297mm x 210mm at 3.78px/mm)
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles */}
//         <div className="absolute top-0 left-0 w-40 h-40 z-0">
//           <div className="absolute w-full h-full bg-blue-600 clip-triangle-top-left z-0" />
//           <div className="absolute w-full h-full bg-purple-800 clip-triangle-top-left-smaller z-10" />
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles */}
//         <div className="absolute bottom-0 right-0 w-40 h-40 z-0">
//           <div className="absolute w-full h-full bg-blue-600 clip-triangle-bottom-right z-0" />
//           <div className="absolute w-full h-full bg-purple-700 clip-triangle-bottom-right-smaller z-10" />
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-6 left-6 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={80} height={80} />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-4 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={100} height={100} />
//         </div>

//         <h2
//           className="text-5xl font-bold mb-1 z-10 relative bg-white inline-block px-4"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-2xl tracking-wide mb-6 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-lg uppercase mb-6 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-2xl font-bold mb-4 border-b border-purple-500 inline-block px-8 py-2 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-md text-gray-700 mt-6 mb-10 max-w-2xl mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           <div className="text-center">
//             <p className="text-sm font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-sm" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           {qrCodeUrl ? (
//             <Image
//               src={qrCodeUrl}
//               alt="QR Code for Certificate Verification"
//               width={50}
//               height={50}
//             />
//           ) : (
//             <p>Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center mt-10 px-10 z-10 relative">
//           <div>
//             <div className="border-t border-purple-500 w-40 mb-1 mx-auto"></div>
//             <p
//               className="font-bold"
//               style={{ color: "blue", textTransform: "uppercase" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div>
//               <Image src="/cert.png" alt="Eduskill Logo" width={90} height={60} />
//             </div>
//           </div>

//           <div>
//             <p className="font-bold" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div
//               className="border-t font-bold border-purple-500 w-40 mb-1 mx-auto"
//               style={{ color: "blue" }}
//             >
//               DATE
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;









// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 50, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       // Create a clone of the certificate element
//       const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;
      
//       // Make it invisible and add to body
//       certificateClone.style.position = 'absolute';
//       certificateClone.style.left = '-9999px';
//       certificateClone.style.top = '0';
//       certificateClone.style.width = '1122px';
//       certificateClone.style.height = '793px';
//       document.body.appendChild(certificateClone);

//       // Wait for images to load
//       await new Promise(resolve => setTimeout(resolve, 500));

//       const canvas = await html2canvas(certificateClone, {
//         scale: 2, // Higher scale for better quality
//         width: 1122,
//         height: 793,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#fff',
//         removeContainer: true,
//       });

//       document.body.removeChild(certificateClone);

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [1122, 793] // Exact dimensions of our certificate
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, 1122, 793);
//       pdf.save(`${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-10">
//       <div className="flex justify-center mb-6 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[1122px] h-[793px] mx-auto p-10 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-hidden ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: 'none',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat'
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles */}
//         <div className="absolute top-0 left-0 w-40 h-40 z-0">
//           <div className="absolute w-full h-full bg-blue-600 clip-triangle-top-left z-0" />
//           <div className="absolute w-full h-full bg-purple-800 clip-triangle-top-left-smaller z-10" />
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles */}
//         <div className="absolute bottom-0 right-0 w-40 h-40 z-0">
//           <div className="absolute w-full h-full bg-blue-600 clip-triangle-bottom-right z-0" />
//           <div className="absolute w-full h-full bg-purple-700 clip-triangle-bottom-right-smaller z-10" />
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-6 left-6 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={80} height={80} />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-4 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={100} height={100} />
//         </div>

//         <h2
//           className="text-5xl font-bold mb-1 z-10 relative bg-white inline-block px-4"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-2xl tracking-wide mb-6 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-lg uppercase mb-6 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-2xl font-bold mb-4 border-b border-purple-500 inline-block px-8 py-2 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-md text-gray-700 mt-6 mb-10 max-w-2xl mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           <div className="text-center">
//             <p className="text-sm font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-sm" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           {qrCodeUrl ? (
//             <Image
//               src={qrCodeUrl}
//               alt="QR Code for Certificate Verification"
//               width={50}
//               height={50}
//             />
//           ) : (
//             <p>Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center mt-10 px-10 z-10 relative">
//           <div>
//             <div className="border-t border-purple-500 w-40 mb-1 mx-auto"></div>
//             <p
//               className="font-bold"
//               style={{ color: "blue", textTransform: "uppercase" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div>
//               <Image src="/cert.png" alt="Eduskill Logo" width={90} height={60} />
//             </div>
//           </div>

//           <div>
//             <p className="font-bold" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div
//               className="border-t font-bold border-purple-500 w-40 mb-1 mx-auto"
//               style={{ color: "blue" }}
//             >
//               DATE
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;









// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 50, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       // Create a clone of the certificate element
//       const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;
      
//       // Copy computed styles to ensure clip-paths are applied
//       const originalStyles = window.getComputedStyle(certificateRef.current);
//       certificateClone.style.cssText = originalStyles.cssText;
      
//       // Ensure all child elements inherit correct styles
//       const originalElements = certificateRef.current.querySelectorAll("*");
//       const cloneElements = certificateClone.querySelectorAll("*");
//       originalElements.forEach((el, index) => {
//         const computedStyle = window.getComputedStyle(el);
//         cloneElements[index].setAttribute("style", computedStyle.cssText);
//       });

//       // Make it invisible and add to body
//       certificateClone.style.position = "absolute";
//       certificateClone.style.left = "-9999px";
//       certificateClone.style.top = "0";
//       certificateClone.style.width = "1122px";
//       certificateClone.style.height = "793px";
//       document.body.appendChild(certificateClone);

//       // Force a reflow to ensure styles are applied
//       certificateClone.offsetHeight;

//       // Wait for images and styles to load
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Increased delay for rendering

//       const canvas = await html2canvas(certificateClone, {
//         scale: 2, // Higher scale for better quality
//         width: 1122,
//         height: 793,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#fff",
//         removeContainer: true,
//       });

//       document.body.removeChild(certificateClone);

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [1122, 793], // Exact dimensions of our certificate
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, 1122, 793);
//       pdf.save(`${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-10">
//       <div className="flex justify-center mb-6 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[1122px] h-[793px] mx-auto p-10 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-hidden ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles */}
//         <div className="absolute top-0 left-0 w-40 h-40 z-0">
//           <div className="absolute w-full h-full bg-blue-600 clip-triangle-top-left z-0" />
//           <div className="absolute w-full h-full bg-purple-800 clip-triangle-top-left-smaller z-10" />
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles */}
//         <div className="absolute bottom-0 right-0 w-40 h-40 z-0">
//           <div className="absolute w-full h-full bg-blue-600 clip-triangle-bottom-right z-0" />
//           <div className="absolute w-full h-full bg-purple-700 clip-triangle-bottom-right-smaller z-10" />
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-6 left-6 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={80} height={80} />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-4 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={100} height={100} />
//         </div>

//         <h2
//           className="text-5xl font-bold mb-1 z-10 relative bg-white inline-block px-4"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-2xl tracking-wide mb-6 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-lg uppercase mb-6 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-2xl font-bold mb-4 border-b border-purple-500 inline-block px-8 py-2 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-md text-gray-700 mt-6 mb-10 max-w-2xl mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           <div className="text-center">
//             <p className="text-sm font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-sm" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           {qrCodeUrl ? (
//             <Image
//               src={qrCodeUrl}
//               alt="QR Code for Certificate Verification"
//               width={50}
//               height={50}
//             />
//           ) : (
//             <p>Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center mt-10 px-10 z-10 relative">
//           <div>
//             <div className="border-t border-purple-500 w-40 mb-1 mx-auto"></div>
//             <p
//               className="font-bold"
//               style={{ color: "blue", textTransform: "uppercase" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div>
//               <Image src="/cert.png" alt="Eduskill Logo" width={90} height={60} />
//             </div>
//           </div>

//           <div>
//             <p className="font-bold" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div
//               className="border-t font-bold border-purple-500 w-40 mb-1 mx-auto"
//               style={{ color: "blue" }}
//             >
//               DATE
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;


 




// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 50, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;
//       certificateClone.style.position = "absolute";
//       certificateClone.style.left = "-9999px";
//       certificateClone.style.top = "0";
//       certificateClone.style.width = "1122px";
//       certificateClone.style.height = "793px";
//       document.body.appendChild(certificateClone);

//       await new Promise(resolve => setTimeout(resolve, 500));

//       const canvas = await html2canvas(certificateClone, {
//         scale: 2,
//         width: 1122,
//         height: 793,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#fff",
//         removeContainer: true,
//       });

//       document.body.removeChild(certificateClone);

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [1122, 793],
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, 1122, 793);
//       pdf.save(`${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-10">
//       <div className="flex justify-center mb-6 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[1122px] h-[793px] mx-auto p-10 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-hidden ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-40 h-40 z-0">
//           <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,0 160,0 0,160" fill="#2563EB" />
//           </svg>
//           <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-40 h-40 z-0">
//           <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,160 160,0 160,160" fill="#2563EB" />
//           </svg>
//           <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="32,160 160,32 160,160" fill="#6B21A8" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-6 left-6 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={80} height={80} />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-4 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={100} height={100} />
//         </div>

//         <h2
//           className="text-5xl font-bold mb-1 z-10 relative bg-white inline-block px-4"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-2xl tracking-wide mb-6 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-lg uppercase mb-6 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-2xl font-bold mb-4 border-b border-purple-500 inline-block px-8 py-2 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-md text-gray-700 mt-6 mb-10 max-w-2xl mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           <div className="text-center">
//             <p className="text-sm font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-sm" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           {qrCodeUrl ? (
//             <Image
//               src={qrCodeUrl}
//               alt="QR Code for Certificate Verification"
//               width={50}
//               height={50}
//             />
//           ) : (
//             <p>Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center mt-10 px-10 z-10 relative">
//           <div className="text-center">
//             <div className="border-t border-purple-500 w-40 mb-1 mx-auto"></div>
//             <p
//               className="font-bold"
//               style={{ color: "blue", textTransform: "uppercase" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div>
//               <Image src="/cert.png" alt="Eduskill Logo" width={90} height={60} />
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-500 w-40 mb-1 mx-auto"></div>
//             <p
//               className="font-bold"
//               style={{ color: "blue", textTransform: "uppercase" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;





// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;
//       certificateClone.style.position = "absolute";
//       certificateClone.style.left = "-9999px";
//       certificateClone.style.top = "0";
//       certificateClone.style.width = "1122px";
//       certificateClone.style.height = "793px";
//       document.body.appendChild(certificateClone);

//       await new Promise(resolve => setTimeout(resolve, 500));

//       const canvas = await html2canvas(certificateClone, {
//         scale: 2,
//         width: 1122,
//         height: 793,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#fff",
//         removeContainer: true,
//       });

//       document.body.removeChild(certificateClone);

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [1122, 793],
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, 1122, 793);
//       pdf.save(`${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-10">
//       <div className="flex justify-center mb-6 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[1122px] h-[793px] mx-auto p-10 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-hidden ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-40 h-40 z-0">
//           <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,0 160,0 0,160" fill="#2563EB" />
//           </svg>
//           <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-40 h-40 z-0">
//           <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,160 160,0 160,160" fill="#2563EB" />
//           </svg>
//           <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="32,160 160,32 160,160" fill="#6B21A8" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-6 left-6 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={80} height={80} />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-4 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={100} height={100} />
//         </div>

//         <h2
//           className="text-5xl font-bold mb-1 z-10 relative bg-white inline-block px-4"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-2xl tracking-wide mb-6 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-lg uppercase mb-6 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-2xl font-bold mb-4 border-b border-purple-500 inline-block px-8 py-2 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-md text-gray-700 mt-6 mb-10 max-w-2xl mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           <div className="text-center">
//             <p className="text-sm font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-sm" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-3 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={80}
//                 height={80}
//               />
//             </div>
//           ) : (
//             <p>Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center mt-10 px-10 z-10 relative">
//           <div className="text-center">
//             <div className="border-t border-purple-500 w-40 mb-1 mx-auto"></div>
//             <p
//               className="font-bold"
//               style={{ color: "blue", textTransform: "uppercase" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div>
//               <Image src="/cert.png" alt="Eduskill Logo" width={90} height={60} />
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-500 w-40 mb-1 mx-auto"></div>
//             <p
//               className="font-bold"
//               style={{ color: "blue", textTransform: "uppercase" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;





// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;
//       certificateClone.style.position = "absolute";
//       certificateClone.style.left = "-9999px";
//       certificateClone.style.top = "0";
//       certificateClone.style.width = "900px";
//       certificateClone.style.height = "636px";
//       document.body.appendChild(certificateClone);

//       await new Promise(resolve => setTimeout(resolve, 500));

//       const canvas = await html2canvas(certificateClone, {
//         scale: 2,
//         width: 900,
//         height: 636,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#fff",
//         removeContainer: true,
//       });

//       document.body.removeChild(certificateClone);

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [900, 636],
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, 900, 636);
//       pdf.save(`${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       <div className="flex justify-center mb-6 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[636px] mx-auto p-8 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-hidden ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,0 160,0 0,160" fill="#2563EB" />
//           </svg>
//           <svg width="128" height="128" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,160 160,0 160,160" fill="#2563EB" />
//           </svg>
//           <svg width="128" height="128" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="32,160 160,32 160,160" fill="#6B21A8" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-3 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-5 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-5 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-3 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-5 mb-8 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-5 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-5 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={64}
//                 height={64}
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center mt-8 px-8 z-10 relative">
//           <div className="text-center">
//             <Image src="/shivani.png" alt="shivani"  width={72} height={28}  />
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div>
//               <Image src="/cert.png" alt="Eduskill Logo" width={72} height={48} />
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;







// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;
//       certificateClone.style.position = "absolute";
//       certificateClone.style.left = "-9999px";
//       certificateClone.style.top = "0";
//       certificateClone.style.width = "900px";
//       certificateClone.style.height = "636px";
//       document.body.appendChild(certificateClone);

//       // Wait for images to load
//       const images = certificateClone.querySelectorAll("img");
//       const loadPromises = Array.from(images).map(
//         (img) =>
//           new Promise((resolve) => {
//             if (img.complete) {
//               resolve(true);
//             } else {
//               img.onload = () => resolve(true);
//               img.onerror = () => resolve(true);
//             }
//           })
//       );

//       await Promise.all(loadPromises);
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Increased delay to ensure rendering

//       const canvas = await html2canvas(certificateClone, {
//         scale: 2,
//         width: 900,
//         height: 636,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#fff",
//         removeContainer: true,
//       });

//       document.body.removeChild(certificateClone);

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [900, 636],
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, 900, 636);
//       pdf.save(`${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[636px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,0 160,0 0,160" fill="#2563EB" />
//           </svg>
//           <svg width="128" height="128" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="0,160 160,0 160,160" fill="#2563EB" />
//           </svg>
//           <svg width="128" height="128" viewBox="0 0 160 160" style={{ position: "absolute" }}>
//             <polygon points="32,160 160,32 160,160" fill="#6B21A8" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-2 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-4 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={64}
//                 height={64}
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-end mt-6 px-8 z-20 relative">
//           <div className="text-center">
//             <div className="flex justify-center mb-1">
//               <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={38} />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div className="-ml-8">
//               <Image src="/logg.png" alt="Eduskill Logo" width={150} height={48} />
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;








// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }


// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;
//       certificateClone.style.position = "absolute";
//       certificateClone.style.left = "-9999px";
//       certificateClone.style.top = "0";
//       certificateClone.style.width = "900px";
//       certificateClone.style.height = "636px";
//       document.body.appendChild(certificateClone);

//       // Wait for images to load
//       const images = certificateClone.querySelectorAll("img");
//       const loadPromises = Array.from(images).map(
//         (img) =>
//           new Promise((resolve) => {
//             if (img.complete) {
//               resolve(true);
//             } else {
//               img.onload = () => resolve(true);
//               img.onerror = () => resolve(true);
//             }
//           })
//       );

//       await Promise.all(loadPromises);
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Increased delay to ensure rendering

//       const canvas = await html2canvas(certificateClone, {
//         scale: 2,
//         width: 900,
//         height: 636,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#fff",
//         removeContainer: true,
//       });

//       document.body.removeChild(certificateClone);

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [900, 636],
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, 900, 636);
//       pdf.save(`${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[636px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,0 128,0 0,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,128 128,0 128,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-2 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-4 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={64}
//                 height={64}
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-end mt-6 px-8 z-20 relative">
//           <div className="text-center">
//             <div className="flex justify-center mb-1">
//               <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={38} />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div className="-ml-8">
//               <Image src="/logg.png" alt="Eduskill Logo" width={150} height={48} />
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-800 w-32 mb-1  mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;





















// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
//   const [imagesLoaded, setImagesLoaded] = useState(false);

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   // Preload all images
//   useEffect(() => {
//     const images = [
//       "/ribbonremover.png",
//       "/pic-ed.png",
//       "/shivsig.png",
//       "/logg.png"
//     ];
    
//     const loadPromises = images.map(src => {
//       return new Promise((resolve, reject) => {
//         const img = new window.Image();
//         img.src = src;
//         img.onload = () => resolve(true);
//         img.onerror = (err) => reject(err);
//       });
//     });

//     Promise.all(loadPromises)
//       .then(() => setImagesLoaded(true))
//       .catch(err => console.error("Error preloading images:", err));
//   }, []);

//   useEffect(() => {
//     if (user && imagesLoaded) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName, imagesLoaded]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current || !imagesLoaded) return;

//     setIsGenerating(true);
//     try {
//       // Create a clone of the certificate node
//       const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;
//       certificateClone.style.position = "absolute";
//       certificateClone.style.left = "-9999px";
//       certificateClone.style.top = "0";
//       certificateClone.style.width = "900px";
//       certificateClone.style.height = "636px";
//       certificateClone.style.overflow = "visible";
//       document.body.appendChild(certificateClone);

//       // Wait for fonts to load
//       await document.fonts.ready;

//       // Additional delay to ensure all elements are rendered
//       await new Promise(resolve => setTimeout(resolve, 500));

//       const canvas = await html2canvas(certificateClone, {
//         scale: 3, // Increased scale for higher quality
//         width: 900,
//         height: 636,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#fff",
//         removeContainer: true,
//         allowTaint: true,
//         windowWidth: 900,
//         windowHeight: 636,
//       });

//       document.body.removeChild(certificateClone);

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [900, 636],
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, 900, 636, undefined, 'FAST');
      
//       // Add metadata (using the correct method)
//       if ('setProperties' in pdf) {
//         pdf.setProperties({
//           title: `${recipientName} - ${courseName} Certificate`,
//           subject: "Certificate of Completion",
//           author: "Eduskill",
//           creator: "Eduskill Online Learning",
//         });
//       }
      
//       pdf.save(`${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[636px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,0 128,0 0,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,128 128,0 128,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image 
//             src="/ribbonremover.png" 
//             alt="Badge" 
//             width={64} 
//             height={64}
//             priority
//           />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-2 z-10 relative">
//           <Image 
//             src="/pic-ed.png" 
//             alt="Pic-Ed Logo" 
//             width={80} 
//             height={80}
//             priority
//           />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-4 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={64}
//                 height={64}
//                 priority
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-end mt-6 px-8 z-20 relative">
//           <div className="text-center">
//             <div className="flex justify-center mb-1">
//               <Image 
//                 src="/shivsig.png" 
//                 alt="Shivani Signature" 
//                 width={110} 
//                 height={38}
//                 priority
//               />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div className="-ml-8">
//               <Image 
//                 src="/logg.png" 
//                 alt="Eduskill Logo" 
//                 width={150} 
//                 height={48}
//                 priority
//               />
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-800 w-32 mb-1  mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;





// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";
// import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf, Font } from "@react-pdf/renderer";
// import { Canvas } from "@react-pdf/renderer";

// // Register Roboto font (or your custom font)
// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "/fonts/fon.ttf" },
//     //{ src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
//   ],
// });

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// // Define styles for @react-pdf/renderer
// const pdfStyles = StyleSheet.create({
//   page: {
//     width: 900,
//     height: 636,
//     padding: 32,
//     paddingBottom: 48,
//     backgroundColor: "#ffffff",
//     flexDirection: "column",
//     position: "relative",
//     fontFamily: "Roboto",
//   },
//   topLeftTriangle: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: 128,
//     height: 128,
//   },
//   bottomRightTriangle: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: 128,
//     height: 128,
//   },
//   ribbon: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     width: 64,
//     height: 64,
//   },
//   logoContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 4,
//     color: "black",
//   },
//   courseName: {
//     fontSize: 20,
//     textAlign: "center",
//     marginBottom: 16,
//     color: "#8B5CF6",
//   },
//   subtitle: {
//     fontSize: 14,
//     textAlign: "center",
//     color: "#4B5563",
//     textTransform: "uppercase",
//     marginBottom: 16,
//     letterSpacing: 2,
//   },
//   recipientName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "blue",
//     textTransform: "uppercase",
//     borderBottomWidth: 2,
//     borderBottomColor: "#8B5CF6",
//     paddingHorizontal: 24,
//     paddingVertical: 4,
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 12,
//     textAlign: "center",
//     color: "#4B5563",
//     marginHorizontal: 80,
//     marginBottom: 24,
//   },
//   certificateIdContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   certificateIdLabel: {
//     fontSize: 10,
//     fontWeight: "bold",
//     color: "black",
//     textAlign: "center",
//   },
//   certificateId: {
//     fontSize: 10,
//     color: "blue",
//     textAlign: "center",
//   },
//   qrCodeContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 16,
//     padding: 8,
//     backgroundColor: "#ffffff",
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//   },
//   qrCode: {
//     width: 64,
//     height: 64,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 24,
//     paddingHorizontal: 32,
//     position: "absolute",
//     bottom: 32,
//     width: "100%",
//   },
//   footerLeft: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   footerRight: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   footerCenter: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginLeft: -32,
//   },
//   signatureImage: {
//     width: 110,
//     height: 38,
//     marginBottom: 4,
//   },
//   eduskillLogo: {
//     width: 150,
//     height: 48,
//   },
//   signatureLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#8B5CF6",
//     width: 128,
//     marginBottom: 4,
//   },
//   dateLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#6B21A8",
//     width: 128,
//     marginBottom: 4,
//   },
//   signatureName: {
//     fontSize: 10,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.25,
//   },
//   dateText: {
//     fontSize: 10,
//     fontWeight: "bold",
//     color: "black",
//     marginBottom: 4,
//   },
//   dateLabel: {
//     fontSize: 10,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.25,
//   },
// });

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   // Generate QR code
//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1, type: "image/png" }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           setError("Failed to generate QR code");
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   // Define the PDF document
//   const MyDocument = () => (
//     <Document
//       title={`${recipientName} - ${courseName} Certificate`}
//       subject="Certificate of Completion"
//       author="Eduskill"
//       creator="Eduskill Online Learning"
//     >
//       <Page size={[900, 636]} style={pdfStyles.page}>
//         {/* Top Left Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.topLeftTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               // First triangle
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(0, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               // Second triangle
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Bottom Right Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.bottomRightTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               // First triangle
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(128, 128)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               // Second triangle
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 128)
//                 .lineTo(128, 0)
//                 .lineTo(128, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Ribbon Badge */}
//         <PDFImage style={pdfStyles.ribbon} src="/ribbonremover.png" />

//         {/* Logo */}
//         <View style={pdfStyles.logoContainer}>
//           <PDFImage style={pdfStyles.logo} src="/pic-ed.png" />
//         </View>

//         {/* Title */}
//         <Text style={pdfStyles.title}>CERTIFICATE</Text>

//         {/* Course Name */}
//         <Text style={pdfStyles.courseName}>{courseName}</Text>

//         {/* Subtitle */}
//         <Text style={pdfStyles.subtitle}>The following certificate is given to</Text>

//         {/* Recipient Name */}
//         <Text style={pdfStyles.recipientName}>{recipientName}</Text>

//         {/* Description */}
//         <Text style={pdfStyles.description}>
//           This certificate is given to{" "}
//           <Text style={{ color: "blue" }}>{recipientName}</Text> for successfully
//           completing the <Text style={{ color: "black" }}>{courseName}</Text>{" "}
//           course{score !== undefined && ` with an outstanding score of ${score}%`}
//         </Text>

//         {/* Certificate ID */}
//         <View style={pdfStyles.certificateIdContainer}>
//           <View>
//             <Text style={pdfStyles.certificateIdLabel}>Certificate ID</Text>
//             <Text style={pdfStyles.certificateId}>{certificateId}</Text>
//           </View>
//         </View>

//         {/* QR Code */}
//         {qrCodeUrl && (
//           <View style={pdfStyles.qrCodeContainer}>
//             <PDFImage style={pdfStyles.qrCode} src={qrCodeUrl} />
//           </View>
//         )}

//         {/* Footer */}
//         <View style={pdfStyles.footer}>
//           <View style={pdfStyles.footerLeft}>
//             <PDFImage style={pdfStyles.signatureImage} src="/shivsig.png" />
//             <View style={pdfStyles.signatureLine} />
//             <Text style={pdfStyles.signatureName}>SHIVANI JOBANPUTRA</Text>
//           </View>

//           <View style={pdfStyles.footerCenter}>
//             <PDFImage style={pdfStyles.eduskillLogo} src="/logg.png" />
//           </View>

//           <View style={pdfStyles.footerRight}>
//             <Text style={pdfStyles.dateText}>{displayDate}</Text>
//             <View style={pdfStyles.dateLine} />
//             <Text style={pdfStyles.dateLabel}>DATE</Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );

//   const handleDownloadPDF = async () => {
//     if (!qrCodeUrl) {
//       setError("QR code not generated yet");
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);
//     try {
//       const blob = await pdf(<MyDocument />).toBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       setError("Failed to generate PDF. Please check image paths and try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[636px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,0 128,0 0,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,128 128,0 128,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} priority />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-2 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} priority />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-4 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={64}
//                 height={64}
//                 priority
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-end mt-6 px-8 z-20 relative">
//           <div className="text-center">
//             <div className="flex justify-center mb-1">
//               <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={38} priority />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div className="-ml-8">
//               <Image src="/logg.png" alt="Eduskill Logo" width={150} height={48} priority />
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-800 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;





// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";
// import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf, Font } from "@react-pdf/renderer";
// import { Canvas } from "@react-pdf/renderer";

// // Register Roboto font (or your custom font)
// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "/fonts/fon.ttf" },
//     //{ src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
//   ],
// });

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// // Define styles for @react-pdf/renderer
// const pdfStyles = StyleSheet.create({
//   page: {
//     width: 900,
//     height: 636,
//     padding: 32,
//     paddingBottom: 48,
//     backgroundColor: "#ffffff",
//     flexDirection: "column",
//     position: "relative",
//     fontFamily: "Roboto",
//   },
//   topLeftTriangle: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: 128,
//     height: 128,
//   },
//   bottomRightTriangle: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: 128,
//     height: 128,
//   },
//   ribbon: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     width: 64,
//     height: 64,
//   },
//   logoContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 4,
//     color: "black",
//   },
//   courseName: {
//     fontSize: 22,
//     textAlign: "center",
//     marginBottom: 16,
//     color: "#8B5CF6",
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#4B5563",
//     textTransform: "uppercase",
//     marginBottom: 16,
//     letterSpacing: 2,
//   },
//   recipientName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "blue",
//     textTransform: "uppercase",
//     paddingHorizontal: 0,
//     paddingVertical: 4,
//     marginBottom: 8,
//   },
//   recipientNameWrapper: {
//     paddingHorizontal: 24, // Matches browser's px-6 (24px total)
//     alignSelf: "center", // Center the wrapper
//     marginBottom: 16, // Increased to add more space below recipient's name
//   },
//   recipientNameBorder: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#8B5CF6",
//     paddingHorizontal: 0,
//     width: "auto", // Shrink to fit the text width
//     alignSelf: "center", // Center the border
//     paddingBottom:4,
//   },
//   description: {
//     fontSize: 14,
//     textAlign: "center",
//     color: "#4B5563",
//     marginHorizontal: 80,
//     marginBottom: 24,
//     marginTop: 8, // Added to increase space above description
//   },
//   certificateIdContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   certificateIdLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     textAlign: "center",
//   },
//   certificateId: {
//     fontSize: 12,
//     color: "blue",
//     textAlign: "center",
//   },
//   qrCodeContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 16,
//     padding: 8,
//     backgroundColor: "#ffffff",
//   },
//   qrCode: {
//     width: 64,
//     height: 64,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     marginTop: 24,
//     paddingHorizontal: 32,
//     position: "absolute",
//     bottom: 32,
//     width: "100%",
//   },
//   footerLeft: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   footerRight: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginRight: 128,
//   },
//   footerCenter: {
//     flexDirection: "column",
//     alignItems: "center",
//     position: "absolute",
//     left: "50%",
//     marginLeft: -99, // From previous change
//     zIndex: 1,
//   },
//   signatureImage: {
//     width: 110,
//     height: 38,
//     marginBottom: 4,
//   },
//   eduskillLogo: {
//     width: 150,
//     height: 48,
//   },
//   signatureLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#8B5CF6",
//     width: 128,
//     marginBottom: 4,
//   },
//   dateLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#6B21A8",
//     width: 100,
//     marginBottom: 4,
//   },
//   signatureName: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
//   dateText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     marginBottom: 4,
//   },
//   dateLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
// });

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   // Generate QR code
//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1, type: "image/png" }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           setError("Failed to generate QR code");
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   // Define the PDF document
//   const MyDocument = () => (
//     <Document
//       title={`${recipientName} - ${courseName} Certificate`}
//       subject="Certificate of Completion"
//       author="Eduskill"
//       creator="Eduskill Online Learning"
//     >
//       <Page size={[900, 636]} style={pdfStyles.page}>
//         {/* Top Left Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.topLeftTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               // First triangle
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(0, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               // Second triangle
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Bottom Right Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.bottomRightTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               // First triangle
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(128, 128)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               // Second triangle
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 128)
//                 .lineTo(128, 0)
//                 .lineTo(128, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Ribbon Badge */}
//         <PDFImage style={pdfStyles.ribbon} src="/ribbonremover.png" />

//         {/* Logo */}
//         <View style={pdfStyles.logoContainer}>
//           <PDFImage style={pdfStyles.logo} src="/pic-ed.png" />
//         </View>

//         {/* Title */}
//         <Text style={pdfStyles.title}>CERTIFICATE</Text>

//         {/* Course Name */}
//         <Text style={pdfStyles.courseName}>{courseName}</Text>

//         {/* Subtitle */}
//         <Text style={pdfStyles.subtitle}>The following certificate is given to</Text>

//         {/* Recipient Name with Border */}
//         <View style={pdfStyles.recipientNameWrapper}>
//           <View style={pdfStyles.recipientNameBorder}>
//             <Text style={pdfStyles.recipientName}>{recipientName}</Text>
//           </View>
//         </View>

//         {/* Description */}
//         <Text style={pdfStyles.description}>
//           This certificate is given to{" "}
//           <Text style={{ color: "blue" }}>{recipientName}</Text> for successfully
//           completing the <Text style={{ color: "black" }}>{courseName}</Text>{" "}
//           course{score !== undefined && ` with an outstanding score of ${score}%`}
//         </Text>

//         {/* Certificate ID */}
//         <View style={pdfStyles.certificateIdContainer}>
//           <View>
//             <Text style={pdfStyles.certificateIdLabel}>Certificate ID</Text>
//             <Text style={pdfStyles.certificateId}>{certificateId}</Text>
//           </View>
//         </View>

//         {/* QR Code */}
//         {qrCodeUrl && (
//           <View style={pdfStyles.qrCodeContainer}>
//             <PDFImage style={pdfStyles.qrCode} src={qrCodeUrl} />
//           </View>
//         )}

//         {/* Footer */}
//         <View style={pdfStyles.footer}>
//           <View style={pdfStyles.footerLeft}>
//             <PDFImage style={pdfStyles.signatureImage} src="/shivsig.png" />
//             <View style={pdfStyles.signatureLine} />
//             <Text style={pdfStyles.signatureName}>SHIVANI JOBANPUTRA</Text>
//           </View>

//           <View style={pdfStyles.footerCenter}>
//             <PDFImage style={pdfStyles.eduskillLogo} src="/boto.png" />
//           </View>

//           <View style={pdfStyles.footerRight}>
//             <Text style={pdfStyles.dateText}>{displayDate}</Text>
//             <View style={pdfStyles.dateLine} />
//             <Text style={pdfStyles.dateLabel}>DATE</Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );

//   const handleDownloadPDF = async () => {
//     if (!qrCodeUrl) {
//       setError("QR code not generated yet");
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);
//     try {
//       const blob = await pdf(<MyDocument />).toBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       setError("Failed to generate PDF. Please check image paths and try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[636px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,0 128,0 0,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,128 128,0 128,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} priority />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-2 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} priority />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-4 z-10 relative"
//           style={{ color: "purple" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={64}
//                 height={64}
//                 priority
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-end mt-6 px-8 z-20 relative">
//           <div className="text-center">
//             <div className="flex justify-center mb-1">
//               <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={18} priority />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div className="-ml-8">
//               <Image src="/boto.png" alt="Eduskill Logo" width={150} height={48} priority />
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-800 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;










// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";
// import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf, Font } from "@react-pdf/renderer";
// import { Canvas } from "@react-pdf/renderer";

// // Register Roboto font (or your custom font)
// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "/fonts/fon.ttf" },
//   ],
// });

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// // Define styles for @react-pdf/renderer
// const pdfStyles = StyleSheet.create({
//   page: {
//     width: 900,
//     height: 636,
//     padding: 32,
//     paddingBottom: 48,
//     backgroundColor: "#ffffff",
//     flexDirection: "column",
//     position: "relative",
//     fontFamily: "Roboto",
//   },
//   topLeftTriangle: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: 128,
//     height: 128,
//   },
//   bottomRightTriangle: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: 128,
//     height: 128,
//   },
//   ribbon: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     width: 64,
//     height: 64,
//   },
//   logoContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 4,
//     color: "black",
//   },
//   courseName: {
//     fontSize: 22,
//     textAlign: "center",
//     marginBottom: 16,
//     color: "#8B5CF6",
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#4B5563",
//     textTransform: "uppercase",
//     marginBottom: 16,
//     letterSpacing: 2,
//   },
//   recipientName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "blue",
//     textTransform: "uppercase",
//     paddingHorizontal: 0,
//     paddingVertical: 4,
//     marginBottom: 8,
//   },
//   recipientNameWrapper: {
//     paddingHorizontal: 24,
//     alignSelf: "center",
//     marginBottom: 16,
//   },
//   recipientNameBorder: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#8B5CF6",
//     paddingHorizontal: 0,
//     width: "auto",
//     alignSelf: "center",
//     paddingBottom: 4,
//   },
//   description: {
//     fontSize: 14,
//     textAlign: "center",
//     color: "#4B5563",
//     marginHorizontal: 80,
//     marginBottom: 24,
//     marginTop: 8,
//   },
//   certificateIdContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   certificateIdLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     textAlign: "center",
//   },
//   certificateId: {
//     fontSize: 12,
//     color: "blue",
//     textAlign: "center",
//   },
//   qrCodeContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 24,
//     padding: 8,
//     backgroundColor: "#ffffff",
//   },
//   qrCode: {
//     width: 64,
//     height: 64,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     marginTop: 24,
//     paddingHorizontal: 32,
//     position: "absolute",
//     bottom: 32,
//     width: "100%",
//   },
//   footerLeft: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   footerRight: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginRight: 128,
//   },
//   footerCenter: {
//     flexDirection: "column",
//     alignItems: "center",
//     position: "absolute",
//     left: "50%",
//     transform: "translateX(-50%)",
//     bottom: 10,
//   },
//   signatureImage: {
//     width: 110,
//     height: 38,
//     marginBottom: 4,
//   },
//   eduskillLogo: {
//     width: 120,
//     height: 38,
//     objectFit: "contain",
//   },
//   signatureLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#8B5CF6",
//     width: 128,
//     marginBottom: 4,
//   },
//   dateLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#6B21A8",
//     width: 100,
//     marginBottom: 4,
//   },
//   signatureName: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
//   dateText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     marginBottom: 4,
//   },
//   dateLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
// });

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   // Generate QR code
//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1, type: "image/png" }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           setError("Failed to generate QR code");
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   // Define the PDF document
//   const MyDocument = () => (
//     <Document
//       title={`${recipientName} - ${courseName} Certificate`}
//       subject="Certificate of Completion"
//       author="Eduskill"
//       creator="Eduskill Online Learning"
//     >
//       <Page size={[900, 636]} style={pdfStyles.page}>
//         {/* Top Left Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.topLeftTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(0, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Bottom Right Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.bottomRightTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(128, 128)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 128)
//                 .lineTo(128, 0)
//                 .lineTo(128, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Ribbon Badge */}
//         <PDFImage style={pdfStyles.ribbon} src="/ribbonremover.png" />

//         {/* Logo */}
//         <View style={pdfStyles.logoContainer}>
//           <PDFImage style={pdfStyles.logo} src="/pic-ed.png" />
//         </View>

//         {/* Title */}
//         <Text style={pdfStyles.title}>CERTIFICATE</Text>

//         {/* Course Name */}
//         <Text style={pdfStyles.courseName}>{courseName}</Text>

//         {/* Subtitle */}
//         <Text style={pdfStyles.subtitle}>The following certificate is given to</Text>

//         {/* Recipient Name with Border */}
//         <View style={pdfStyles.recipientNameWrapper}>
//           <View style={pdfStyles.recipientNameBorder}>
//             <Text style={pdfStyles.recipientName}>{recipientName}</Text>
//           </View>
//         </View>

//         {/* Description */}
//         <Text style={pdfStyles.description}>
//           This certificate is given to{" "}
//           <Text style={{ color: "blue" }}>{recipientName}</Text> for successfully
//           completing the <Text style={{ color: "black" }}>{courseName}</Text>{" "}
//           course{score !== undefined && ` with an outstanding score of ${score}%`}
//         </Text>

//         {/* Certificate ID */}
//         <View style={pdfStyles.certificateIdContainer}>
//           <View>
//             <Text style={pdfStyles.certificateIdLabel}>Certificate ID</Text>
//             <Text style={pdfStyles.certificateId}>{certificateId}</Text>
//           </View>
//         </View>

//         {/* QR Code */}
//         {qrCodeUrl && (
//           <View style={pdfStyles.qrCodeContainer}>
//             <PDFImage style={pdfStyles.qrCode} src={qrCodeUrl} />
//           </View>
//         )}

//         {/* Footer */}
//         <View style={pdfStyles.footer}>
//           <View style={pdfStyles.footerLeft}>
//             <PDFImage style={pdfStyles.signatureImage} src="/shivsig.png" />
//             <View style={pdfStyles.signatureLine} />
//             <Text style={pdfStyles.signatureName}>SHIVANI JOBANPUTRA</Text>
//           </View>

//           <View style={pdfStyles.footerCenter}>
//             <PDFImage style={pdfStyles.eduskillLogo} src="/boto.png" />
//           </View>

//           <View style={pdfStyles.footerRight}>
//             <Text style={pdfStyles.dateText}>{displayDate}</Text>
//             <View style={pdfStyles.dateLine} />
//             <Text style={pdfStyles.dateLabel}>DATE</Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );

//   const handleDownloadPDF = async () => {
//     if (!qrCodeUrl) {
//       setError("QR code not generated yet");
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);
//     try {
//       const blob = await pdf(<MyDocument />).toBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       setError("Failed to generate PDF. Please check image paths and try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[700px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,0 128,0 0,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,128 128,0 128,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} priority />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-2 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} priority />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-4 z-10 relative"
//           style={{ color: "purple" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={64}
//                 height={64}
//                 priority
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-end mt-4 px-8 z-20 relative">
//           <div className="text-center">
//             <div className="flex justify-center mb-1">
//               <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={18} priority />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           {/* Center Logo: Positioned in Flow */}
//           <div className="flex justify-center items-center mr-8">
//             <Image
//               src="/boto.png"
//               alt="Eduskill Logo"
//               width={120}
//               height={38}
//               priority
//               style={{ objectFit: "contain" }}
//             />
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-800 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;














// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";
// import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf, Font } from "@react-pdf/renderer";
// import { Canvas } from "@react-pdf/renderer";

// // Register Roboto font (or your custom font)
// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "/fonts/fon.ttf" },
//   ],
// });

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// // Define styles for @react-pdf/renderer
// const pdfStyles = StyleSheet.create({
//   page: {
//     width: 900,
//     height: 636,
//     padding: 32,
//     paddingBottom: 48,
//     backgroundColor: "#ffffff",
//     flexDirection: "column",
//     position: "relative",
//     fontFamily: "Roboto",
//   },
//   topLeftTriangle: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: 128,
//     height: 128,
//   },
//   bottomRightTriangle: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: 128,
//     height: 128,
//   },
//   ribbon: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     width: 64,
//     height: 64,
//   },
//   logoContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 4,
//     color: "black",
//   },
//   courseName: {
//     fontSize: 22,
//     textAlign: "center",
//     marginBottom: 16,
//     color: "#8B5CF6",
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#4B5563",
//     textTransform: "uppercase",
//     marginBottom: 16,
//     letterSpacing: 2,
//   },
//   recipientName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "blue",
//     textTransform: "uppercase",
//     paddingHorizontal: 0,
//     paddingVertical: 4,
//     marginBottom: 8,
//   },
//   recipientNameWrapper: {
//     paddingHorizontal: 24,
//     alignSelf: "center",
//     marginBottom: 16,
//   },
//   recipientNameBorder: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#8B5CF6",
//     paddingHorizontal: 0,
//     width: "auto",
//     alignSelf: "center",
//     paddingBottom: 4,
//   },
//   description: {
//     fontSize: 14,
//     textAlign: "center",
//     color: "#4B5563",
//     marginHorizontal: 80,
//     marginBottom: 24,
//     marginTop: 8,
//   },
//   certificateIdContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   certificateIdLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     textAlign: "center",
//   },
//   certificateId: {
//     fontSize: 12,
//     color: "blue",
//     textAlign: "center",
//   },
//   qrCodeContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 24,
//     padding: 8,
//     backgroundColor: "#ffffff",
//   },
//   qrCode: {
//     width: 64,
//     height: 64,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     marginTop: 24,
//     paddingHorizontal: 32,
//     position: "absolute",
//     bottom: 32,
//     width: "100%",
//   },
//   footerLeft: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   footerRight: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginRight: 128,
//   },
//   footerCenter: {
//     flexDirection: "column",
//     alignItems: "center",
//     position: "absolute",
//     left: "50%",
//     transform: "translateX(-50%)",
//     bottom: 10,
//   },
//   signatureImage: {
//     width: 110,
//     height: 38,
//     marginBottom: 4,
//   },
//   eduskillLogo: {
//     width: 150, // Increased width for better visibility in PDF
//     height: 48, // Increased height proportionally
//     objectFit: "contain",
//   },
//   signatureLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#8B5CF6",
//     width: 128,
//     marginBottom: 4,
//   },
//   dateLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#6B21A8",
//     width: 100,
//     marginBottom: 4,
//   },
//   signatureName: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
//   dateText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     marginBottom: 4,
//   },
//   dateLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
// });

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   // Generate QR code
//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1, type: "image/png" }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           setError("Failed to generate QR code");
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   // Define the PDF document
//   const MyDocument = () => (
//     <Document
//       title={`${recipientName} - ${courseName} Certificate`}
//       subject="Certificate of Completion"
//       author="Eduskill"
//       creator="Eduskill Online Learning"
//     >
//       <Page size={[900, 636]} style={pdfStyles.page}>
//         {/* Top Left Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.topLeftTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(0, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Bottom Right Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.bottomRightTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(128, 128)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 128)
//                 .lineTo(128, 0)
//                 .lineTo(128, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Ribbon Badge */}
//         <PDFImage style={pdfStyles.ribbon} src="/ribbonremover.png" />

//         {/* Logo */}
//         <View style={pdfStyles.logoContainer}>
//           <PDFImage style={pdfStyles.logo} src="/pic-ed.png" />
//         </View>

//         {/* Title */}
//         <Text style={pdfStyles.title}>CERTIFICATE</Text>

//         {/* Course Name */}
//         <Text style={pdfStyles.courseName}>{courseName}</Text>

//         {/* Subtitle */}
//         <Text style={pdfStyles.subtitle}>The following certificate is given to</Text>

//         {/* Recipient Name with Border */}
//         <View style={pdfStyles.recipientNameWrapper}>
//           <View style={pdfStyles.recipientNameBorder}>
//             <Text style={pdfStyles.recipientName}>{recipientName}</Text>
//           </View>
//         </View>

//         {/* Description */}
//         <Text style={pdfStyles.description}>
//           This certificate is given to{" "}
//           <Text style={{ color: "blue" }}>{recipientName}</Text> for successfully
//           completing the <Text style={{ color: "black" }}>{courseName}</Text>{" "}
//           course{score !== undefined && ` with an outstanding score of ${score}%`}
//         </Text>

//         {/* Certificate ID */}
//         <View style={pdfStyles.certificateIdContainer}>
//           <View>
//             <Text style={pdfStyles.certificateIdLabel}>Certificate ID</Text>
//             <Text style={pdfStyles.certificateId}>{certificateId}</Text>
//           </View>
//         </View>

//         {/* QR Code */}
//         {qrCodeUrl && (
//           <View style={pdfStyles.qrCodeContainer}>
//             <PDFImage style={pdfStyles.qrCode} src={qrCodeUrl} />
//           </View>
//         )}

//         {/* Footer */}
//         <View style={pdfStyles.footer}>
//           <View style={pdfStyles.footerLeft}>
//             <PDFImage style={pdfStyles.signatureImage} src="/shivsig.png" />
//             <View style={pdfStyles.signatureLine} />
//             <Text style={pdfStyles.signatureName}>SHIVANI JOBANPUTRA</Text>
//           </View>

//           <View style={pdfStyles.footerCenter}>
//             <PDFImage style={pdfStyles.eduskillLogo} src="/boto.png" />
//           </View>

//           <View style={pdfStyles.footerRight}>
//             <Text style={pdfStyles.dateText}>{displayDate}</Text>
//             <View style={pdfStyles.dateLine} />
//             <Text style={pdfStyles.dateLabel}>DATE</Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );

//   const handleDownloadPDF = async () => {
//     if (!qrCodeUrl) {
//       setError("QR code not generated yet");
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);
//     try {
//       const blob = await pdf(<MyDocument />).toBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       setError("Failed to generate PDF. Please check image paths and try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[700px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,0 128,0 0,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,128 128,0 128,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} priority />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-2 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} priority />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-4 z-10 relative"
//           style={{ color: "purple" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={64}
//                 height={64}
//                 priority
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-end mt-4 px-8 z-20 relative">
//           <div className="text-center">
//             <div className="flex justify-center mb-1">
//               <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={18} priority />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           {/* Center Logo: Positioned in Flow */}
//           <div className="flex justify-center items-center mr-8">
//             <Image
//               src="/boto.png"
//               alt="Eduskill Logo"
//               width={120}
//               height={38}
//               priority
//               style={{ objectFit: "contain" }}
//             />
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-800 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;












// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";
// import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf, Font } from "@react-pdf/renderer";
// import { Canvas } from "@react-pdf/renderer";

// // Register Roboto font (or your custom font)
// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "/fonts/fon.ttf" },
//   ],
// });

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// // Define styles for @react-pdf/renderer
// const pdfStyles = StyleSheet.create({
//   page: {
//     width: 900,
//     height: 636,
//     padding: 32,
//     paddingBottom: 48,
//     backgroundColor: "#ffffff",
//     flexDirection: "column",
//     position: "relative",
//     fontFamily: "Roboto",
//   },
//   topLeftTriangle: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: 128,
//     height: 128,
//   },
//   bottomRightTriangle: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: 128,
//     height: 128,
//   },
//   ribbon: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     width: 64,
//     height: 64,
//   },
//   logoContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 4,
//     color: "black",
//   },
//   courseName: {
//     fontSize: 22,
//     textAlign: "center",
//     marginBottom: 16,
//     color: "#8B5CF6",
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#4B5563",
//     textTransform: "uppercase",
//     marginBottom: 16,
//     letterSpacing: 2,
//   },
//   recipientName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "blue",
//     textTransform: "uppercase",
//     paddingHorizontal: 0,
//     paddingVertical: 4,
//     marginBottom: 8,
//   },
//   recipientNameWrapper: {
//     paddingHorizontal: 24,
//     alignSelf: "center",
//     marginBottom: 16,
//   },
//   recipientNameBorder: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#8B5CF6",
//     paddingHorizontal: 0,
//     width: "auto",
//     alignSelf: "center",
//     paddingBottom: 4,
//   },
//   description: {
//     fontSize: 14,
//     textAlign: "center",
//     color: "#4B5563",
//     marginHorizontal: 80,
//     marginBottom: 24,
//     marginTop: 8,
//   },
//   certificateIdContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   certificateIdLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     textAlign: "center",
//   },
//   certificateId: {
//     fontSize: 12,
//     color: "blue",
//     textAlign: "center",
//   },
//   qrCodeContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 24,
//     padding: 8,
//     backgroundColor: "#ffffff",
//     //paddingBottom:20,
//   },
//   qrCode: {
//     width: 96,
//     height: 96,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     marginTop: 24,
//     paddingHorizontal: 32,
//     position: "absolute",
//     bottom: 32,
//     width: "100%",
//   },
//   footerLeft: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   footerRight: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginRight: 128,
//   },
//   footerCenter: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginRight: -24,
//   },
//   signatureImage: {
//     width: 110,
//     height: 38,
//     marginBottom: 4,
//   },
//   eduskillLogo: {
//     objectFit: "contain",
//     width: 300, // Assumed original width of boto.png in pixels
//     height: 100, // Assumed original height of boto.png in pixels
//   },
//   signatureLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#8B5CF6",
//     width: 128,
//     marginBottom: 4,
//   },
//   dateLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#6B21A8",
//     width: 100,
//     marginBottom: 4,
//   },
//   signatureName: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
//   dateText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     marginBottom: 4,
//   },
//   dateLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
// });

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   // Generate QR code
//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1, type: "image/png" }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           setError("Failed to generate QR code");
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   // Define the PDF document
//   const MyDocument = () => (
//     <Document
//       title={`${recipientName} - ${courseName} Certificate`}
//       subject="Certificate of Completion"
//       author="Eduskill"
//       creator="Eduskill Online Learning"
//     >
//       <Page size={[900, 636]} style={pdfStyles.page} wrap={false}>
//         {/* Top Left Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.topLeftTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(0, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Bottom Right Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.bottomRightTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(128, 128)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 128)
//                 .lineTo(128, 0)
//                 .lineTo(128, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Ribbon Badge */}
//         <PDFImage style={pdfStyles.ribbon} src="/ribbonremover.png" />

//         {/* Logo */}
//         <View style={pdfStyles.logoContainer}>
//           <PDFImage style={pdfStyles.logo} src="/pic-ed.png" />
//         </View>

//         {/* Title */}
//         <Text style={pdfStyles.title}>CERTIFICATE</Text>

//         {/* Course Name */}
//         <Text style={pdfStyles.courseName}>{courseName}</Text>

//         {/* Subtitle */}
//         <Text style={pdfStyles.subtitle}>The following certificate is given to</Text>

//         {/* Recipient Name with Border */}
//         <View style={pdfStyles.recipientNameWrapper}>
//           <View style={pdfStyles.recipientNameBorder}>
//             <Text style={pdfStyles.recipientName}>{recipientName}</Text>
//           </View>
//         </View>

//         {/* Description */}
//         <Text style={pdfStyles.description}>
//           This certificate is given to{" "}
//           <Text style={{ color: "blue" }}>{recipientName}</Text> for successfully
//           completing the <Text style={{ color: "black" }}>{courseName}</Text>{" "}
//           course{score !== undefined && ` with an outstanding score of ${score}%`}
//         </Text>

//         {/* Certificate ID */}
//         <View style={pdfStyles.certificateIdContainer}>
//           <View>
//             <Text style={pdfStyles.certificateIdLabel}>Certificate ID</Text>
//             <Text style={pdfStyles.certificateId}>{certificateId}</Text>
//           </View>
//         </View>

//         {/* QR Code */}
//         {qrCodeUrl && (
//           <View style={pdfStyles.qrCodeContainer}>
//             <PDFImage style={pdfStyles.qrCode} src={qrCodeUrl} />
//           </View>
//         )}

//         {/* Footer */}
//         <View style={pdfStyles.footer}>
//           <View style={pdfStyles.footerLeft}>
//             <PDFImage style={pdfStyles.signatureImage} src="/shivsig.png" />
//             <View style={pdfStyles.signatureLine} />
//             <Text style={pdfStyles.signatureName}>SHIVANI JOBANPUTRA</Text>
//           </View>

//           <View style={pdfStyles.footerCenter}>
//             <PDFImage style={pdfStyles.eduskillLogo} src="/boto.png" />
//           </View>

//           <View style={pdfStyles.footerRight}>
//             <Text style={pdfStyles.dateText}>{displayDate}</Text>
//             <View style={pdfStyles.dateLine} />
//             <Text style={pdfStyles.dateLabel}>DATE</Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );

//   const handleDownloadPDF = async () => {
//     if (!qrCodeUrl) {
//       setError("QR code not generated yet");
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);
//     try {
//       const doc = <MyDocument />;
//       const blob = await pdf(doc).toBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (error: unknown) {
//       console.error("Error generating PDF:", error);
//       let errorMessage: string;
//       if (error instanceof Error) {
//         errorMessage = error.message;
//       } else {
//         errorMessage = String(error);
//       }
//       setError(
//         `Failed to generate PDF: ${errorMessage}. Please ensure all image paths are correct (e.g., /boto.png).`
//       );
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-4"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[700px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,0 128,0 0,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,128 128,0 128,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} priority />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-2 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} priority />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-4 z-10 relative"
//           style={{ color: "purple" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={94}
//                 height={94}
//                 priority
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-end mt-4 px-8 z-20 relative">
//           <div className="text-center pb-6">
//             <div className="flex justify-center mb-1">
//               <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={18} priority />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           {/* Center Logo: Positioned in Flow */}
//           <div className="flex justify-center items-center mr-8 pt-10">
//             <Image
//               src="/boto.png"
//               alt="Eduskill Logo"
//               width={120}
//               height={38}
//               priority
//               style={{ objectFit: "contain" }}
//             />
//           </div>

//           <div className="text-center pb-6">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-800 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;






























// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";
// import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf, Font } from "@react-pdf/renderer";
// import { Canvas } from "@react-pdf/renderer";

// // Register Roboto font (or your custom font)
// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "/fonts/fon.ttf" },
//   ],
// });

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// // Define styles for @react-pdf/renderer
// const pdfStyles = StyleSheet.create({
//   page: {
//     width: 900,
//     height: 636,
//     padding: 32,
//     paddingBottom: 48,
//     backgroundColor: "#ffffff",
//     flexDirection: "column",
//     position: "relative",
//     fontFamily: "Roboto",
//   },
//   topLeftTriangle: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: 128,
//     height: 128,
//   },
//   bottomRightTriangle: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: 128,
//     height: 128,
//   },
//   ribbon: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     width: 128, // Assumed original width of ribbonremover.png in pixels
//     height: 128, // Assumed original height of ribbonremover.png in pixels
//   },
//   logoContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 4,
//     color: "black",
//   },
//   courseName: {
//     fontSize: 22,
//     textAlign: "center",
//     marginBottom: 16,
//     color: "#8B5CF6",
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#4B5563",
//     textTransform: "uppercase",
//     marginBottom: 16,
//     letterSpacing: 2,
//   },
//   recipientName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "blue",
//     textTransform: "uppercase",
//     paddingHorizontal: 0,
//     paddingVertical: 4,
//     marginBottom: 8,
//   },
//   recipientNameWrapper: {
//     paddingHorizontal: 24,
//     alignSelf: "center",
//     marginBottom: 16,
//   },
//   recipientNameBorder: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#8B5CF6",
//     paddingHorizontal: 0,
//     width: "auto",
//     alignSelf: "center",
//     paddingBottom: 4,
//   },
//   description: {
//     fontSize: 14,
//     textAlign: "center",
//     color: "#4B5563",
//     marginHorizontal: 80,
//     marginBottom: 24,
//     marginTop: 8,
//   },
//   certificateIdContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   certificateIdLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     textAlign: "center",
//   },
//   certificateId: {
//     fontSize: 12,
//     color: "blue",
//     textAlign: "center",
//   },
//   qrCodeContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 24,
//     padding: 8,
//     backgroundColor: "#ffffff",
    
//   },
//   qrCode: {
//     width: 64,
//     height: 64,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     marginTop: 24,
//     paddingHorizontal: 32,
//     position: "absolute",
//     bottom: 32,
//     width: "100%",
//   },
//   footerLeft: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   footerRight: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginRight: 128,
//   },
//   footerCenter: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginRight: -21,
//   },
//   signatureImage: {
//     width: 110,
//     height: 38,
//     marginBottom: 4,
//   },
//   eduskillLogo: {
//     objectFit: "contain",
//     width: 300, // Assumed original width of boto.png in pixels
//     height: 100, // Assumed original height of boto.png in pixels
//     paddingTop:24,
//     marginLeft:12,
//   },
//   signatureLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#8B5CF6",
//     width: 128,
//     marginBottom: 4,
//   },
//   dateLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#6B21A8",
//     width: 100,
//     marginBottom: 4,
//   },
//   signatureName: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
//   dateText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     marginBottom: 4,
//   },
//   dateLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
// });

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   // Generate QR code
//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1, type: "image/png" }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           setError("Failed to generate QR code");
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   // Define the PDF document
//   const MyDocument = () => (
//     <Document
//       title={`${recipientName} - ${courseName} Certificate`}
//       subject="Certificate of Completion"
//       author="Eduskill"
//       creator="Eduskill Online Learning"
//     >
//       <Page size={[900, 636]} style={pdfStyles.page}>
//         {/* Top Left Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.topLeftTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(0, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Bottom Right Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.bottomRightTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(128, 128)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 128)
//                 .lineTo(128, 0)
//                 .lineTo(128, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Ribbon Badge */}
//         <PDFImage style={pdfStyles.ribbon} src="/ribbonremover.png" />

//         {/* Logo */}
//         <View style={pdfStyles.logoContainer}>
//           <PDFImage style={pdfStyles.logo} src="/pic-ed.png" />
//         </View>

//         {/* Title */}
//         <Text style={pdfStyles.title}>CERTIFICATE</Text>

//         {/* Course Name */}
//         <Text style={pdfStyles.courseName}>{courseName}</Text>

//         {/* Subtitle */}
//         <Text style={pdfStyles.subtitle}>The following certificate is given to</Text>

//         {/* Recipient Name with Border */}
//         <View style={pdfStyles.recipientNameWrapper}>
//           <View style={pdfStyles.recipientNameBorder}>
//             <Text style={pdfStyles.recipientName}>{recipientName}</Text>
//           </View>
//         </View>

//         {/* Description */}
//         <Text style={pdfStyles.description}>
//           This certificate is given to{" "}
//           <Text style={{ color: "blue" }}>{recipientName}</Text> for successfully
//           completing the <Text style={{ color: "black" }}>{courseName}</Text>{" "}
//           course{score !== undefined && ` with an outstanding score of ${score}%`}
//         </Text>

//         {/* Certificate ID */}
//         <View style={pdfStyles.certificateIdContainer}>
//           <View>
//             <Text style={pdfStyles.certificateIdLabel}>Certificate ID</Text>
//             <Text style={pdfStyles.certificateId}>{certificateId}</Text>
//           </View>
//         </View>

//         {/* QR Code */}
//         {qrCodeUrl && (
//           <View style={pdfStyles.qrCodeContainer}>
//             <PDFImage style={pdfStyles.qrCode} src={qrCodeUrl} />
//           </View>
//         )}

//         {/* Footer */}
//         <View style={pdfStyles.footer}>
//           <View style={pdfStyles.footerLeft}>
//             <PDFImage style={pdfStyles.signatureImage} src="/shivsig.png" />
//             <View style={pdfStyles.signatureLine} />
//             <Text style={pdfStyles.signatureName}>SHIVANI JOBANPUTRA</Text>
//           </View>

//           <View style={pdfStyles.footerCenter}>
//             <PDFImage style={pdfStyles.eduskillLogo} src="/boto.png" />
//           </View>

//           <View style={pdfStyles.footerRight}>
//             <Text style={pdfStyles.dateText}>{displayDate}</Text>
//             <View style={pdfStyles.dateLine} />
//             <Text style={pdfStyles.dateLabel}>DATE</Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );

//   const handleDownloadPDF = async () => {
//     if (!qrCodeUrl) {
//       setError("QR code not generated yet");
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);
//     try {
//       const doc = <MyDocument />;
//       const blob = await pdf(doc).toBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (error: unknown) {
//       console.error("Error generating PDF:", error);
//       let errorMessage: string;
//       if (error instanceof Error) {
//         errorMessage = error.message;
//       } else {
//         errorMessage = String(error);
//       }
//       setError(
//         `Failed to generate PDF: ${errorMessage}. Please ensure all image paths are correct (e.g., /boto.png).`
//       );
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-4"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[700px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,0 128,0 0,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,128 128,0 128,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} priority />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-2 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} priority />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-4 z-10 relative"
//           style={{ color: "purple" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={96}
//                 height={96}
//                 priority
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-end mt-4 px-8 z-20 relative">
//           <div className="text-center pb-5">
//             <div className="flex justify-center mb-1">
//               <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={18} priority />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           {/* Center Logo: Positioned in Flow */}
//           <div className="flex justify-center items-center mr-9 pt-6">
//             <Image
//               src="/boto.png"
//               alt="Eduskill Logo"
//               width={120}
//               height={38}
//               priority
//               style={{ objectFit: "contain",
//                  paddingTop: "9px",
//                }}
//             />
//           </div>

//           <div className="text-center pb-5">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-800 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;







"use client";

import React, { useRef, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import QRCode from "qrcode";
import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf, Font } from "@react-pdf/renderer";
import { Canvas } from "@react-pdf/renderer";

// Register Roboto font (or your custom font)
Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/fon.ttf" },
  ],
});

interface CertificateProps {
  recipientName: string;
  courseName: string;
  date: string;
  issuerName?: string;
  score?: number;
  certificateId: string;
  locked?: boolean;
  onUnlockRequest?: () => void;
}

// Define styles for @react-pdf/renderer
const pdfStyles = StyleSheet.create({
  page: {
    width: 900,
    height: 700,
    padding: 36,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    position: "relative",
    fontFamily: "Roboto",
    boxSizing: "border-box",
  },
  topLeftTriangle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 128,
    height: 128,
  },
  bottomRightTriangle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 128,
    height: 128,
  },
  ribbon: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 105,
    height: 90,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    color: "black",
  },
  courseName: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 16,
    color: "#8B5CF6",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#4B5563",
    textTransform: "uppercase",
    marginBottom: 16,
    letterSpacing: 2,
  },
  recipientNameWrapper: {
    paddingHorizontal: 24,
    alignSelf: "center",
    marginBottom: 16,
  },
  recipientNameBorder: {
    borderBottomWidth: 2,
    borderBottomColor: "#8B5CF6",
    paddingBottom: 4,
  },
  recipientName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#4B5563",
    marginHorizontal: 80,
    marginBottom: 16,
  },
  certificateIdContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  certificateIdLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  certificateId: {
    fontSize: 12,
    color: "blue",
    textAlign: "center",
  },
  qrCodeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#ffffff",
  },
  qrCode: {
    width: 128,
    height: 128,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "absolute",
    bottom: 36,
    width: "100%",
    paddingHorizontal: 36,
  },
  footerLeft: {
    flexDirection: "column",
    alignItems: "center",
  },
  footerRight: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 50, // Shift left to avoid triangle corner
  },
  footerCenter: {
    flexDirection: "column",
    alignItems: "center",
  },
  signatureImage: {
    width: 110,
    height: 38,
    marginBottom: 4,
  },
  eduskillLogo: {
    objectFit: "contain",
    width: 270,
    height: 80,
    marginRight:70,
     
  },
  signatureLine: {
    borderTopWidth: 2,
    borderTopColor: "#8B5CF6",
    width: 128,
    marginBottom: 4,
  },
  dateLine: {
    borderTopWidth: 2,
    borderTopColor: "#6B21A8",
    width: 100,
    marginBottom: 4,
  },
  signatureName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "blue",
    textTransform: "uppercase",
    lineHeight: 1.3,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    marginBottom: 4,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "blue",
    textTransform: "uppercase",
    lineHeight: 1.3,
  },
});

const Certificate: React.FC<CertificateProps> = ({
  recipientName,
  courseName,
  date,
  issuerName = "EDUSKILL ONLINE LEARNING",
  score,
  certificateId,
  locked = false,
  onUnlockRequest,
}) => {
  const { user } = useUser();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const displayDate = date || new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).split("/").join("-");

  // Generate QR code
  useEffect(() => {
    if (user) {
      const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
      console.log("QR Code Data:", qrData); // Debug the QR code URL
      QRCode.toDataURL(
        qrData,
        {
          width: 128, // Increased size for better scannability
          margin: 2, // Increased margin for clarity
          errorCorrectionLevel: "H", // High error correction for reliability
          type: "image/png",
        },
        (err, url) => {
          if (err) {
            console.error("Error generating QR code:", err);
            setError("Failed to generate QR code");
            return;
          }
          setQrCodeUrl(url);
        }
      );
    }
  }, [user, certificateId, courseName]);

  // Define the PDF document
  const MyDocument = () => (
    <Document
      title={`${recipientName} - ${courseName} Certificate`}
      subject="Certificate of Completion"
      author="Eduskill"
      creator="Eduskill Online Learning"
    >
      <Page size={[900, 700]} style={pdfStyles.page}>
        {/* Top Left Corner: Two Overlapping Triangles */}
        <View style={pdfStyles.topLeftTriangle}>
          <Canvas
            paint={(painter) => {
              painter
                .fillColor("#6B21A8")
                .moveTo(0, 0)
                .lineTo(128, 0)
                .lineTo(0, 128)
                .fill();
              painter
                .fillColor("#2563EB")
                .moveTo(64, 0)
                .lineTo(128, 0)
                .lineTo(0, 128)
                .fill();
              return null;
            }}
          />
        </View>

        {/* Bottom Right Corner: Two Overlapping Triangles */}
        <View style={pdfStyles.bottomRightTriangle}>
          <Canvas
            paint={(painter) => {
              painter
                .fillColor("#6B21A8")
                .moveTo(128, 128)
                .lineTo(128, 0)
                .lineTo(0, 128)
                .fill();
              painter
                .fillColor("#2563EB")
                .moveTo(64, 128)
                .lineTo(128, 0)
                .lineTo(128, 128)
                .fill();
              return null;
            }}
          />
        </View>

        {/* Ribbon Badge */}
        <PDFImage style={pdfStyles.ribbon} src="/ribbonremover.png" />

        {/* Logo */}
        <View style={pdfStyles.logoContainer}>
          <PDFImage style={pdfStyles.logo} src="/pic-ed.png" />
        </View>

        {/* Title */}
        <Text style={pdfStyles.title}>CERTIFICATE</Text>

        {/* Course Name */}
        <Text style={pdfStyles.courseName}>{courseName}</Text>

        {/* Subtitle */}
        <Text style={pdfStyles.subtitle}>The following certificate is given to</Text>

        {/* Recipient Name with Border */}
        <View style={pdfStyles.recipientNameWrapper}>
          <View style={pdfStyles.recipientNameBorder}>
            <Text style={pdfStyles.recipientName}>{recipientName}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={pdfStyles.description}>
          This certificate is given to{" "}
          <Text style={{ color: "blue" }}>{recipientName}</Text> for successfully
          completing the <Text style={{ color: "black" }}>{courseName}</Text>{" "}
          course{score !== undefined && ` with an outstanding score of ${score}%`}
        </Text>

        {/* Certificate ID */}
        <View style={pdfStyles.certificateIdContainer}>
          <View>
            <Text style={pdfStyles.certificateIdLabel}>Certificate ID</Text>
            <Text style={pdfStyles.certificateId}>{certificateId}</Text>
          </View>
        </View>

        {/* QR Code */}
        {qrCodeUrl && (
          <View style={pdfStyles.qrCodeContainer}>
            <PDFImage style={pdfStyles.qrCode} src={qrCodeUrl} />
          </View>
        )}

        {/* Footer */}
        <View style={pdfStyles.footer}>
          <View style={pdfStyles.footerLeft}>
            <PDFImage style={pdfStyles.signatureImage} src="/shivsig.png" />
            <View style={pdfStyles.signatureLine} />
            <Text style={pdfStyles.signatureName}>SHIVANI JOBANPUTRA</Text>
          </View>

          <View style={pdfStyles.footerCenter}>
            <PDFImage style={pdfStyles.eduskillLogo} src="/boto.png" />
          </View>

          <View style={pdfStyles.footerRight}>
            <Text style={pdfStyles.dateText}>{displayDate}</Text>
            <View style={pdfStyles.dateLine} />
            <Text style={pdfStyles.dateLabel}>DATE</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const handleDownloadPDF = async () => {
    if (!qrCodeUrl) {
      setError("QR code not generated yet");
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const doc = <MyDocument />;
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error: unknown) {
      console.error("Error generating PDF:", error);
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      setError(
        `Failed to generate PDF: ${errorMessage}. Please ensure all image paths are correct (e.g., /boto.png, /pic-ed.png, /ribbonremover.png, /shivsig.png).`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (locked) {
      onUnlockRequest?.();
    } else {
      handleDownloadPDF();
    }
  };

  const addToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
    window.open(linkedInUrl, "_blank");
  };

  if (!user) {
    return <div className="text-center p-10">Please sign in to view your certificate.</div>;
  }

  return (
    <div className="w-full max-w-[900px] mx-auto p-4 box-border">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="flex justify-center mb-4 space-x-4">
        {!locked && (
          <>
            <button
              onClick={handleButtonClick}
              className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
            </button>
            <button
              onClick={addToLinkedIn}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-4"
            >
              <FaLinkedin size={20} />
              <span>Share on LinkedIn</span>
            </button>
          </>
        )}
        {locked && (
          <>
            <button
              onClick={handleButtonClick}
              className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
            >
              Unlock Certificate
            </button>
            <p className="text-red-500 text-sm mt-2">
              Complete the quiz with a passing score to unlock your certificate
            </p>
          </>
        )}
      </div>

      <div
        ref={certificateRef}
        className={`relative w-[900px] h-[700px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
          locked ? "opacity-50" : ""
        }`}
        style={{
          backgroundImage: "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {locked && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
            <div className="text-4xl">🔒</div>
            <p className="text-lg font-bold">Certificate Locked</p>
            <p>Complete the quiz to unlock</p>
          </div>
        )}

        {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
        <div className="absolute top-0 left-0 w-32 h-32 z-0">
          <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
            <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
            <polygon points="64,0 128,0 0,128" fill="#2563EB" />
          </svg>
        </div>

        {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
        <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
          <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
            <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
            <polygon points="64,128 128,0 128,128" fill="#2563EB" />
          </svg>
        </div>

        {/* Ribbon Badge */}
        <div className="absolute top-5 left-5 z-20">
          <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} priority />
        </div>

        {/* Logo */}
        <div className="flex justify-center items-center mb-2 z-10 relative">
          <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} priority />
        </div>

        <h2
          className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
          style={{ color: "black" }}
        >
          CERTIFICATE
        </h2>

        <h2
          className="text-xl tracking-wide mb-4 z-10 relative"
          style={{ color: "purple" }}
        >
          {courseName}
        </h2>

        <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
          The following certificate is given to
        </p>

        <h3
          className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
          style={{ color: "blue", textTransform: "uppercase" }}
        >
          {recipientName}
        </h3>

        <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
          This certificate is given to{" "}
          <strong style={{ color: "blue" }}>{recipientName}</strong> for
          successfully completing the{" "}
          <strong style={{ color: "black" }}>{courseName}</strong> course
          {score !== undefined && ` with an outstanding score of ${score}%`}
        </p>

        {/* Certificate ID */}
        <div className="flex justify-center mb-4 z-10 relative">
          <div className="text-center">
            <p className="text-xs font-bold" style={{ color: "black" }}>
              Certificate ID
            </p>
            <p className="text-xs" style={{ color: "blue" }}>
              {certificateId}
            </p>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-6 z-10 relative">
          {qrCodeUrl ? (
            <div className="p-2 bg-white border border-gray-300">
              <Image
                src={qrCodeUrl}
                alt="QR Code for Certificate Verification"
                width={96}
                height={96}
                priority
              />
            </div>
          ) : (
            <p className="text-sm">Generating QR code...</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-4 px-8 z-20 relative">
          <div className="text-center pb-5">
            <div className="flex justify-center mb-1">
              <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={18} priority />
            </div>
            <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
            <p
              className="font-bold text-sm"
              style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
            >
              SHIVANI JOBANPUTRA
            </p>
          </div>

          {/* Center Logo: Positioned in Flow */}
          <div className="flex justify-center items-center mr-9 pt-6">
            <Image
              src="/boto.png"
              alt="Eduskill Logo"
              width={120}
              height={38}
              priority
              style={{ objectFit: "contain", paddingTop: "9px" }}
            />
          </div>

          <div className="text-center pb-5">
            <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
              {displayDate}
            </p>
            <div className="border-t border-purple-800 w-32 mb-1 mx-auto"></div>
            <p
              className="font-bold text-sm"
              style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
            >
              DATE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;


 

























// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";
// import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf, Font } from "@react-pdf/renderer";
// import { Canvas } from "@react-pdf/renderer";

// // Register Roboto font (or your custom font)
// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "/fonts/fon.ttf" },
//   ],
// });

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// // Define styles for @react-pdf/renderer
// const pdfStyles = StyleSheet.create({
//   page: {
//     width: 900,
//     height: 636,
//     padding: 32,
//     paddingBottom: 48,
//     backgroundColor: "#ffffff",
//     flexDirection: "column",
//     position: "relative",
//     fontFamily: "Roboto",
//   },
//   topLeftTriangle: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: 128,
//     height: 128,
//   },
//   bottomRightTriangle: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: 128,
//     height: 128,
//   },
//   ribbon: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     width: 128, // Assumed original width of ribbonremover.png in pixels
//     height: 128, // Assumed original height of ribbonremover.png in pixels
//   },
//   logoContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 4,
//     color: "black",
//   },
//   courseName: {
//     fontSize: 22,
//     textAlign: "center",
//     marginBottom: 16,
//     color: "#8B5CF6",
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#4B5563",
//     textTransform: "uppercase",
//     marginBottom: 16,
//     letterSpacing: 2,
//   },
//   recipientName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "blue",
//     textTransform: "uppercase",
//     paddingHorizontal: 0,
//     paddingVertical: 4,
//     marginBottom: 8,
//   },
//   recipientNameWrapper: {
//     paddingHorizontal: 24,
//     alignSelf: "center",
//     marginBottom: 16,
//   },
//   recipientNameBorder: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#8B5CF6",
//     paddingHorizontal: 0,
//     width: "auto",
//     alignSelf: "center",
//     paddingBottom: 4,
//   },
//   description: {
//     fontSize: 14,
//     textAlign: "center",
//     color: "#4B5563",
//     marginHorizontal: 80,
//     marginBottom: 24,
//     marginTop: 8,
//   },
//   certificateIdContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   certificateIdLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     textAlign: "center",
//   },
//   certificateId: {
//     fontSize: 12,
//     color: "blue",
//     textAlign: "center",
//   },
//   qrCodeContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 24,
//     padding: 8,
//     backgroundColor: "#ffffff",
//     marginRight:10,
//   },
//   qrCode: {
//     width: 94,
//     height: 94,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     marginTop: 24,
//     paddingHorizontal: 32,
//     position: "absolute",
//     bottom: 32,
//     width: "100%",
//   },
//   footerLeft: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   footerRight: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginRight: 128,
//   },
//   footerCenter: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginRight: -21,
//   },
//   signatureImage: {
//     width: 110,
//     height: 38,
//     marginBottom: 4,
//   },
//   eduskillLogo: {
//     objectFit: "contain",
//     width: 300, // Assumed original width of boto.png in pixels
//     height: 100, // Assumed original height of boto.png in pixels
//     paddingTop: 35,
//   },
//   signatureLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#8B5CF6",
//     width: 128,
//     marginBottom: 4,
//   },
//   dateLine: {
//     borderTopWidth: 2,
//     borderTopColor: "#6B21A8",
//     width: 100,
//     marginBottom: 4,
//   },
//   signatureName: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
//   dateText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "black",
//     marginBottom: 4,
//   },
//   dateLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "blue",
//     textTransform: "uppercase",
//     lineHeight: 1.3,
//   },
// });

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   // Generate QR code
//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1, type: "image/png" }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           setError("Failed to generate QR code");
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   // Define the PDF document
//   const MyDocument = () => (
//     <Document
//       title={`${recipientName} - ${courseName} Certificate`}
//       subject="Certificate of Completion"
//       author="Eduskill"
//       creator="Eduskill Online Learning"
//     >
//       <Page size={[900, 636]} style={pdfStyles.page}>
//         {/* Top Left Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.topLeftTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(0, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 0)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Bottom Right Corner: Two Overlapping Triangles */}
//         <View style={pdfStyles.bottomRightTriangle}>
//           <Canvas
//             paint={(painter, availableWidth, availableHeight) => {
//               painter
//                 .fillColor("#6B21A8")
//                 .moveTo(128, 128)
//                 .lineTo(128, 0)
//                 .lineTo(0, 128)
//                 .fill();
//               painter
//                 .fillColor("#2563EB")
//                 .moveTo(64, 128)
//                 .lineTo(128, 0)
//                 .lineTo(128, 128)
//                 .fill();
//               return null;
//             }}
//           />
//         </View>

//         {/* Ribbon Badge */}
//         <PDFImage style={pdfStyles.ribbon} src="/ribbonremover.png" />

//         {/* Logo */}
//         <View style={pdfStyles.logoContainer}>
//           <PDFImage style={pdfStyles.logo} src="/pic-ed.png" />
//         </View>

//         {/* Title */}
//         <Text style={pdfStyles.title}>CERTIFICATE</Text>

//         {/* Course Name */}
//         <Text style={pdfStyles.courseName}>{courseName}</Text>

//         {/* Subtitle */}
//         <Text style={pdfStyles.subtitle}>The following certificate is given to</Text>

//         {/* Recipient Name with Border */}
//         <View style={pdfStyles.recipientNameWrapper}>
//           <View style={pdfStyles.recipientNameBorder}>
//             <Text style={pdfStyles.recipientName}>{recipientName}</Text>
//           </View>
//         </View>

//         {/* Description */}
//         <Text style={pdfStyles.description}>
//           This certificate is given to{" "}
//           <Text style={{ color: "blue" }}>{recipientName}</Text> for successfully
//           completing the <Text style={{ color: "black" }}>{courseName}</Text>{" "}
//           course{score !== undefined && ` with an outstanding score of ${score}%`}
//         </Text>

//         {/* Certificate ID */}
//         <View style={pdfStyles.certificateIdContainer}>
//           <View>
//             <Text style={pdfStyles.certificateIdLabel}>Certificate ID</Text>
//             <Text style={pdfStyles.certificateId}>{certificateId}</Text>
//           </View>
//         </View>

//         {/* QR Code */}
//         {qrCodeUrl && (
//           <View style={pdfStyles.qrCodeContainer}>
//             <PDFImage style={pdfStyles.qrCode} src={qrCodeUrl} />
//           </View>
//         )}

//         {/* Footer */}
//         <View style={pdfStyles.footer}>
//           <View style={pdfStyles.footerLeft}>
//             <PDFImage style={pdfStyles.signatureImage} src="/shivsig.png" />
//             <View style={pdfStyles.signatureLine} />
//             <Text style={pdfStyles.signatureName}>SHIVANI JOBANPUTRA</Text>
//           </View>

//           <View style={pdfStyles.footerCenter}>
//             <PDFImage style={pdfStyles.eduskillLogo} src="/boto.png" />
//           </View>

//           <View style={pdfStyles.footerRight}>
//             <Text style={pdfStyles.dateText}>{displayDate}</Text>
//             <View style={pdfStyles.dateLine} />
//             <Text style={pdfStyles.dateLabel}>DATE</Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );

//   const handleDownloadPDF = async () => {
//     if (!qrCodeUrl) {
//       setError("QR code not generated yet");
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);
//     try {
//       const doc = <MyDocument />;
//       const blob = await pdf(doc).toBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (error: unknown) {
//       console.error("Error generating PDF:", error);
//       let errorMessage: string;
//       if (error instanceof Error) {
//         errorMessage = error.message;
//       } else {
//         errorMessage = String(error);
//       }
//       setError(
//         `Failed to generate PDF: ${errorMessage}. Please ensure all image paths are correct (e.g., /boto.png).`
//       );
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-4"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[700px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,0 128,0 0,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,128 128,0 128,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} priority />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-2 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} priority />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-4 z-10 relative"
//           style={{ color: "purple" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-6 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={74}
//                 height={54}
//                 priority
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-end mt-4 px-8 z-20 relative">
//           <div className="text-center">
//             <div className="flex justify-center mb-1">
//               <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={18} priority />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           {/* Center Logo: Positioned in Flow */}
//           <div className="flex justify-center items-center mr-8 pt-9">
//             <Image
//               src="/boto.png"
//               alt="Eduskill Logo"
//               width={120}
//               height={38}
//               priority
//               style={{ objectFit: "contain" }}
//             />
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-800 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default Certificate;
















































 






// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       // Define the certificate dimensions
//       const certWidthPx = 900;
//       const certHeightPx = 636;

//       // Create a temporary wrapper to isolate the cloned element
//       const tempWrapper = document.createElement("div");
//       tempWrapper.style.position = "absolute";
//       tempWrapper.style.left = "-9999px";
//       tempWrapper.style.top = "0";
//       tempWrapper.style.width = `${certWidthPx}px`;
//       tempWrapper.style.height = `${certHeightPx}px`;
//       tempWrapper.style.overflow = "hidden";

//       // Clone the certificate element
//       const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;

//       // Store original styles to restore later
//       const originalClassName = certificateClone.className;

//       // Apply fixed dimensions and override responsive styles
//       certificateClone.style.width = `${certWidthPx}px`;
//       certificateClone.style.height = `${certHeightPx}px`;
//       certificateClone.className = `${originalClassName} captureOverride`;

//       tempWrapper.appendChild(certificateClone);
//       document.body.appendChild(tempWrapper);

//       // Wait for images to load
//       const images = certificateClone.querySelectorAll("img");
//       const loadPromises = Array.from(images).map(
//         (img) =>
//           new Promise((resolve) => {
//             if (img.complete) {
//               resolve(true);
//             } else {
//               img.onload = () => resolve(true);
//               img.onerror = () => resolve(true);
//             }
//           })
//       );

//       await Promise.all(loadPromises);
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Ensure rendering completes

//       // Adjust scale based on device pixel ratio for better quality
//       const devicePixelRatio = window.devicePixelRatio || 1;
//       const scale = Math.max(4, devicePixelRatio); // Increased base scale to 4 for better quality

//       // Capture the certificate element as an image using html2canvas
//       const canvas = await html2canvas(certificateClone, {
//         scale: scale,
//         width: certWidthPx,
//         height: certHeightPx,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#fff",
//         removeContainer: true,
//         windowWidth: certWidthPx, // Force viewport width for consistent rendering
//         windowHeight: certHeightPx, // Force viewport height for consistent rendering
//       });

//       // Clean up: remove the temporary wrapper
//       document.body.removeChild(tempWrapper);

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [certWidthPx, certHeightPx],
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, certWidthPx, certHeightPx);
//       pdf.save(`${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[636px] mx-auto p-8 pb-12 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         {/* Top Left Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,0 128,0 0,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Bottom Right Corner: Two Overlapping Triangles (SVG) */}
//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,128 128,0 128,128" fill="#2563EB" />
//           </svg>
//         </div>

//         {/* Ribbon Badge */}
//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} />
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center mb-2 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-1 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-4 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-4 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-2 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mt-4 mb-6 max-w-lg mx-auto z-10 relative">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>

//         {/* Certificate ID */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="flex justify-center mb-4 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={64}
//                 height={64}
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-end mt-6 px-8 z-20 relative">
//           <div className="text-center">
//             <div className="flex justify-center mb-1">
//               <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={38} />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div className="-ml-8">
//               <Image src="/logg.png" alt="Eduskill Logo" width={150} height={48} />
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="font-bold mb-1 text-sm" style={{ color: "black" }}>
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-800 w-32 mb-1  mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1.25rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;








// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import Image from "next/image";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { saveAs } from "file-saver";
// import { FaLinkedin } from "react-icons/fa";
// import QRCode from "qrcode";

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest,
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

//   const displayDate = date || new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).split("/").join("-");

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseName)}`;
//       QRCode.toDataURL(qrData, { width: 80, margin: 1, errorCorrectionLevel: "H" }, (err, url) => {
//         if (err) {
//           console.error("Error generating QR code:", err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseName]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) {
//       console.error("Certificate reference is null");
//       return;
//     }

//     setIsGenerating(true);
//     try {
//       const certWidthPx = 900;
//       let certHeightPx = 636;

//       const tempWrapper = document.createElement("div");
//       tempWrapper.style.position = "absolute";
//       tempWrapper.style.left = "-9999px";
//       tempWrapper.style.top = "0";
//       tempWrapper.style.width = `${certWidthPx}px`;
//       tempWrapper.style.overflow = "visible";

//       const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;
//       const originalClassName = certificateClone.className;

//       certificateClone.style.width = `${certWidthPx}px`;
//       certificateClone.style.height = "auto";
//       certificateClone.className = `${originalClassName} captureOverride`;

//       const images = certificateClone.querySelectorAll("img");
//       images.forEach((img) => {
//         img.style.width = img.getAttribute("width") + "px";
//         img.style.height = img.getAttribute("height") + "px";
//         img.style.objectFit = "contain";
//         img.setAttribute("crossOrigin", "anonymous");
//       });

//       tempWrapper.appendChild(certificateClone);
//       document.body.appendChild(tempWrapper);

//       const loadPromises = Array.from(images).map(
//         (img) =>
//           new Promise((resolve) => {
//             if (img.complete && img.naturalWidth !== 0) {
//               console.log(`Image loaded: ${img.src}`);
//               resolve(true);
//             } else {
//               img.onload = () => {
//                 console.log(`Image loaded successfully: ${img.src}`);
//                 resolve(true);
//               };
//               img.onerror = () => {
//                 console.error(`Failed to load image: ${img.src}`);
//                 resolve(true);
//               };
//             }
//           })
//       );

//       await Promise.all(loadPromises);
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       const fullHeight = certificateClone.scrollHeight;
//       console.log("Calculated certificate height:", fullHeight);
//       certHeightPx = Math.max(certHeightPx, fullHeight);

//       tempWrapper.style.height = `${certHeightPx}px`;

//       const devicePixelRatio = window.devicePixelRatio || 1;
//       const scale = Math.max(4, devicePixelRatio * 2);

//       const canvas = await html2canvas(certificateClone, {
//         scale: scale,
//         width: certWidthPx,
//         height: certHeightPx,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#fff",
//         removeContainer: true,
//         windowWidth: certWidthPx,
//         windowHeight: certHeightPx,
//         onclone: (doc) => {
//           const clonedImages = doc.querySelectorAll("img");
//           clonedImages.forEach((img) => {
//             img.setAttribute("crossOrigin", "anonymous");
//             img.style.width = img.getAttribute("width") + "px";
//             img.style.height = img.getAttribute("height") + "px";
//           });
//         },
//       });

//       document.body.removeChild(tempWrapper);

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [certWidthPx, certHeightPx],
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, certWidthPx, certHeightPx, undefined, "SLOW");
//       const pdfBlob = pdf.output("blob");
//       saveAs(pdfBlob, `${recipientName}_${courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseName)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, "_blank");
//   };

//   if (!user) {
//     return <div className="text-center p-10">Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className="w-full max-w-[900px] mx-auto p-4 box-border">
//       <div className="flex justify-center mb-4 space-x-4">
//         {!locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className={`px-6 py-2 text-white rounded-lg ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
//               disabled={isGenerating}
//             >
//               {isGenerating ? "Generating PDF..." : "Download PDF Certificate"}
//             </button>
//             <button
//               onClick={addToLinkedIn}
//               className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2"
//             >
//               <FaLinkedin size={20} />
//               <span>Share on LinkedIn</span>
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button
//               onClick={handleButtonClick}
//               className="px-6 py-2 text-white bg-gray-400 cursor-not-allowed rounded-lg"
//             >
//               Unlock Certificate
//             </button>
//             <p className="text-red-500 text-sm mt-2">
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
//         )}
//       </div>

//       <div
//         ref={certificateRef}
//         className={`relative w-[900px] h-[636px] mx-auto p-8 bg-white border-4 border-gray-200 shadow-xl rounded-lg text-center font-serif overflow-visible ${
//           locked ? "opacity-50" : ""
//         }`}
//         style={{
//           backgroundImage: "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {locked && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50 z-30">
//             <div className="text-4xl">🔒</div>
//             <p className="text-lg font-bold">Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}

//         <div className="absolute top-0 left-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="0,0 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,0 128,0 0,128" fill="#2563EB" />
//           </svg>
//         </div>

//         <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
//           <svg width="128" height="128" viewBox="0 0 128 128" style={{ position: "absolute" }}>
//             <polygon points="128,128 128,0 0,128" fill="#6B21A8" />
//             <polygon points="64,128 128,0 128,128" fill="#2563EB" />
//           </svg>
//         </div>

//         <div className="absolute top-5 left-5 z-20">
//           <Image src="/ribbonremover.png" alt="Badge" width={64} height={64} priority />
//         </div>

//         <div className="flex justify-center items-center mb-1 z-10 relative">
//           <Image src="/pic-ed.png" alt="Pic-Ed Logo" width={80} height={80} priority />
//         </div>

//         <h2
//           className="text-4xl font-bold mb-0 z-10 relative bg-white inline-block px-3"
//           style={{ color: "black" }}
//         >
//           CERTIFICATE
//         </h2>

//         <h2
//           className="text-xl tracking-wide mb-2 z-10 relative"
//           style={{ color: "#8B5CF6" }}
//         >
//           {courseName}
//         </h2>

//         <p className="text-base uppercase mb-2 text-gray-700 font-medium tracking-widest z-10 relative">
//           The following certificate is given to
//         </p>

//         <h3
//           className="text-xl font-bold mb-1 border-b border-purple-500 inline-block px-6 py-1 z-10 relative"
//           style={{ color: "blue", textTransform: "uppercase" }}
//         >
//           {recipientName}
//         </h3>

//         <p className="text-sm text-gray-700 mb-2 max-w-lg mx-auto z-10 relative leading-tight">
//           This certificate is given to{" "}
//           <strong style={{ color: "blue" }}>{recipientName}</strong> for
//           successfully completing the{" "}
//           <strong style={{ color: "black" }}>{courseName}</strong> course
//           {score !== undefined && ` with an outstanding score of ${score}%`}
//         </p>
//            <br/>

//         <div className="flex justify-center mb-2 z-10 relative">
//           <div className="text-center">
//             <p className="text-xs font-bold" style={{ color: "black" }}>
//               Certificate ID
//             </p>
//             <p className="text-xs" style={{ color: "blue" }}>
//               {certificateId}
//             </p>
//           </div>
//         </div>

//         <div className="flex justify-center mb-2 z-10 relative">
//           {qrCodeUrl ? (
//             <div className="p-2 bg-white border border-gray-300">
//               <Image
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 width={64}
//                 height={64}
//                 priority
//               />
//             </div>
//           ) : (
//             <p className="text-sm">Generating QR code...</p>
//           )}
//         </div>

//         <div className="flex justify-between items-end mt-2 px-8 z-20 relative">
//           <div className="text-center">
//             <div className="flex justify-center mb-0">
//               <Image src="/shivsig.png" alt="Shivani Signature" width={110} height={38} priority />
//             </div>
//             <div className="border-t border-purple-500 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1rem" }}
//             >
//               SHIVANI JOBANPUTRA
//             </p>
//           </div>

//           <div className="text-center">
//             <div className="-ml-8">
//               <Image src="/logg.png" alt="Eduskill Logo" width={150} height={48} priority />
//             </div>
//           </div>

//           <div className="text-center">
//             <p
//               className="font-bold text-sm mb-2"
//               style={{ color: "black", lineHeight: "1rem" }}
//             >
//               {displayDate}
//             </p>
//             <div className="border-t border-purple-800 w-32 mb-1 mx-auto"></div>
//             <p
//               className="font-bold text-sm"
//               style={{ color: "blue", textTransform: "uppercase", lineHeight: "1rem" }}
//             >
//               DATE
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;