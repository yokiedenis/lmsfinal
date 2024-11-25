import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const  handleAuth = () => {
    const {userId} = auth()
    const isAuthorized = isTeacher(userId);
    if (!userId) {
        throw new Error("Unauthenticated user");
    }
    return { userId };
} // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
   courseImage: f({ image:{maxFileSize: "4MB", maxFileCount:1}})
   .middleware(()=> handleAuth())
   .onUploadComplete(()=>{}),

   courseAttachment: f(["text","image","video","pdf", "audio",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"

   ])
   .middleware(()=> handleAuth())
   .onUploadComplete(( )=>{
    }),

   chapterVideo: f({video:{maxFileCount: 1, maxFileSize: "512GB"}})
   .middleware(()=> handleAuth())
   .onUploadComplete(()=>{}),

   profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;