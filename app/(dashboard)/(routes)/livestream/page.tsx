// import React from "react"; 
// import Chat from "@/components/chatlive";
// import LiveStream from "@/components/livestream";


//  export default function Livestream() {

//   return ( 
//     // <div>
//     //    <LiveStream />
//     //    {/* <Chat /> */}
//     // </div>
//    );
//  }
  
import React from "react";

export default function Livestream() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <a 
      href="https://classroom.google.com/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
    >
      Open Google Classroom
    </a>
  </div>
  );
}