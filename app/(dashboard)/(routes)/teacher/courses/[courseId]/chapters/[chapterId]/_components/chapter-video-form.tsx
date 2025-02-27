// "use client";

// import * as z from "zod";
// import axios from "axios";
// import Image from "next/image";
// import MuxPlayer from "@mux/mux-player-react"
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
 
 
// import { Chapter, Course, muxData } from "@prisma/client";
// import { FileUpload } from "@/components/file-upload";



// interface ChapterVideoFormProps {
//     initialData: Chapter & {muxData?: muxData | null};
//     courseId: string;
//     chapterId: string;
// }

// //creating a form schema
// const formSchema = z.object({
//     videoUrl: z.string().min(1)
//     // Add more fields as needed
// });



// export const ChapterVideoForm = ({
//     initialData,
//     courseId,
//     chapterId
// }:ChapterVideoFormProps) => {
   
//     const[isEditing, setIsEditing] = useState(false)

//     const toggleEdit = () => setIsEditing((current) => !current);

//     const router = useRouter();

 
   
//     const onSubmit =  async (values: z.infer<typeof formSchema>) => {
//        try{
//             await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
//             toast.success("Chapter updated successfully");
//             toggleEdit();
//             router.refresh();
//        }catch{
//           toast.error("Something went wrong")
//        }
//     }

//     return (
//         <div className="mt-6 border bg-slate-100 rounded-md p-4">
//            <div className="font-medium flex items-center justify-between">
//              Section Video
//              <Button onClick={toggleEdit} variant="ghost">
//                 {isEditing && (
//                     <>Cancel </>
//                 )}
                
//                 {!isEditing && !initialData.videoUrl && (
//                   <>
//                   <PlusCircle className="h-4 w-4 mr-2"/>
//                   Add Video
//                   </>
//                 )}

//                 {!isEditing && initialData.videoUrl && (
//                 <>
//                 <Pencil className="h-4 w-4 mr-2"/>
//                 Edit Video
//                 </>
//             )}
//              </Button>
//            </div>

//           {!isEditing && (
//             !initialData.videoUrl ? (
//               <div className="flex items-center justify-center h-60
//               bg-slate-200 rounded-md
//               ">
//                 <Video className="h-10 w-10 text-slate-500"/>

//               </div>
//             ): (
//               <div className="relative aspect-video mt-2">
//                 <MuxPlayer
//                 playbackId={initialData?.muxData?.playbackId || ""}
//                 />
//               </div>
//             )
//           )}

//           {isEditing && (
//             <div>
//               <FileUpload
//                endpoint="chapterVideo"
//                onChange={(url)=>{
//                      if(url){
//                       onSubmit({videoUrl:url});
//                      }
//                }}
//               />
//               <div className="text-xs text-muted-foreground mt-4">
//                 Upload this sections video
//               </div>


//             </div>
//           )}
          
//           {
//             initialData.videoUrl && !isEditing && (
//               <div className="text-xs text-muted-foreground mt-2">
//                  Videos Can Take Few Moments to process. Refresh the page if video does not appear
//               </div>
//             )}

//         </div>
//     )
 
// }







// "use client";

// import * as z from "zod";
// import axios from "axios";
// import Image from "next/image";
// import MuxPlayer from "@mux/mux-player-react"
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Chapter, Course, muxData } from "@prisma/client";
// import { FileUpload } from "@/components/file-upload";

// interface ChapterVideoFormProps {
//     initialData: Chapter & {muxData?: muxData | null};
//     courseId: string;
//     chapterId: string;
// }

// // Updated form schema to accept either a videoUrl or googleDriveUrl
// const formSchema = z.object({
//     videoUrl: z.string().min(1).optional(),
//     googleDriveUrl: z.string().url().optional(),
// }).refine((data) => data.videoUrl || data.googleDriveUrl, {
//     message: "Either a video file or Google Drive URL must be provided",
//     path: ["videoUrl"],
// });

// export const ChapterVideoForm = ({
//     initialData,
//     courseId,
//     chapterId
// }:ChapterVideoFormProps) => {
   
//     const [isEditing, setIsEditing] = useState(false);
//     const [googleDriveLink, setGoogleDriveLink] = useState("");

//     const toggleEdit = () => setIsEditing((current) => !current);
//     const router = useRouter();

//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         try {
//             // If googleDriveUrl is provided, we'll send that instead of videoUrl
//             const submissionData = values.googleDriveUrl 
//                 ? { googleDriveUrl: values.googleDriveUrl }
//                 : { videoUrl: values.videoUrl };
            
//             await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, submissionData);
//             toast.success("Chapter updated successfully");
//             setGoogleDriveLink(""); // Reset the input
//             toggleEdit();
//             router.refresh();
//         } catch {
//             toast.error("Something went wrong");
//         }
//     }

//     return (
//         <div className="mt-6 border bg-slate-100 rounded-md p-4">
//            <div className="font-medium flex items-center justify-between">
//              Section Video
//              <Button onClick={toggleEdit} variant="ghost">
//                 {isEditing && (
//                     <>Cancel </>
//                 )}
                
//                 {!isEditing && !initialData.videoUrl && (
//                   <>
//                   <PlusCircle className="h-4 w-4 mr-2"/>
//                   Add Video
//                   </>
//                 )}

//                 {!isEditing && initialData.videoUrl && (
//                 <>
//                 <Pencil className="h-4 w-4 mr-2"/>
//                 Edit Video
//                 </>
//             )}
//              </Button>
//            </div>

//           {!isEditing && (
//             !initialData.videoUrl ? (
//               <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
//                 <Video className="h-10 w-10 text-slate-500"/>
//               </div>
//             ): (
//               <div className="relative aspect-video mt-2">
//                 <MuxPlayer
//                 playbackId={initialData?.muxData?.playbackId || ""}
//                 />
//               </div>
//             )
//           )}

//           {isEditing && (
//             <div>
//               <FileUpload
//                endpoint="chapterVideo"
//                onChange={(url)=>{
//                      if(url){
//                       onSubmit({videoUrl: url});
//                      }
//                }}
//               />
//               <div className="text-xs text-muted-foreground mt-4 mb-4">
//                 Upload this sections video
//               </div>
              
//               <div className="mt-4">
//                 <p className="text-sm font-medium mb-2">Or use a Google Drive link:</p>
//                 <div className="flex gap-2">
//                   <Input
//                     value={googleDriveLink}
//                     onChange={(e) => setGoogleDriveLink(e.target.value)}
//                     placeholder="Paste Google Drive video URL here"
//                     className="flex-1"
//                   />
//                   <Button
//                     onClick={() => {
//                       if (googleDriveLink) {
//                         onSubmit({ googleDriveUrl: googleDriveLink });
//                       }
//                     }}
//                     disabled={!googleDriveLink}
//                   >
//                     Submit Link
//                   </Button>
//                 </div>
//                 <div className="text-xs text-muted-foreground mt-2">
//                   Make sure the Google Drive link is public or accessible
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {
//             initialData.videoUrl && !isEditing && (
//               <div className="text-xs text-muted-foreground mt-2">
//                  Videos Can Take Few Moments to process. Refresh the page if video does not appear
//               </div>
//             )
//           }
//         </div>
//     )
// }












"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course, muxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
    initialData: Chapter & {muxData?: muxData | null};
    courseId: string;
    chapterId: string;
}

// Updated form schema to accept either a videoUrl or googleDriveUrl
const formSchema = z.object({
    videoUrl: z.string().min(1).optional(),
    googleDriveUrl: z.string().url().optional(),
}).refine((data) => data.videoUrl || data.googleDriveUrl, {
    message: "Either a video file or Google Drive URL must be provided",
    path: ["videoUrl"],
});

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}:ChapterVideoFormProps) => {
   
    const [isEditing, setIsEditing] = useState(false);
    const [googleDriveLink, setGoogleDriveLink] = useState("");

    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // If googleDriveUrl is provided, we'll send that instead of videoUrl
            const submissionData = values.googleDriveUrl 
                ? { googleDriveUrl: values.googleDriveUrl }
                : { videoUrl: values.videoUrl };
            
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, submissionData);
            toast.success("Chapter updated successfully");
            setGoogleDriveLink(""); // Reset the input
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
           <div className="font-medium flex items-center justify-between">
             Section Video
             <Button onClick={toggleEdit} variant="ghost">
                {isEditing && (
                    <>Cancel </>
                )}
                
                {!isEditing && !initialData.videoUrl && !initialData.googleDriveUrl && (
                  <>
                  <PlusCircle className="h-4 w-4 mr-2"/>
                  Add Video
                  </>
                )}

                {!isEditing && (initialData.videoUrl || initialData.googleDriveUrl) && (
                <>
                <Pencil className="h-4 w-4 mr-2"/>
                Edit Video
                </>
            )}
             </Button>
           </div>

          {!isEditing && (
            !initialData.videoUrl && !initialData.googleDriveUrl ? (
              <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <Video className="h-10 w-4 mr-2 text-slate-500"/>
              </div>
            ) : initialData.googleDriveUrl ? (
              <div className="relative aspect-video mt-2">
                <iframe
                  src={initialData.googleDriveUrl.replace("/view", "/preview")}
                  width="100%"
                  height="100%"
                  allow="autoplay"
                  title="Google Drive Video"
                  className="rounded-md"
                />
              </div>
            ): (
              <div className="relative aspect-video mt-2">
                <MuxPlayer
                playbackId={initialData?.muxData?.playbackId || ""}
                />
              </div>
            )
          )}

          {isEditing && (
            <div>
              <FileUpload
               endpoint="chapterVideo"
               onChange={(url)=>{
                     if(url){
                      onSubmit({videoUrl: url});
                     }
               }}
              />
              <div className="text-xs text-muted-foreground mt-4 mb-4">
                Upload this sections video
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Or use a Google Drive link:</p>
                <div className="flex gap-2">
                  <Input
                    value={googleDriveLink}
                    onChange={(e) => setGoogleDriveLink(e.target.value)}
                    placeholder="Paste Google Drive video URL here"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      if (googleDriveLink) {
                        onSubmit({ googleDriveUrl: googleDriveLink });
                      }
                    }}
                    disabled={!googleDriveLink}
                  >
                    Submit Link
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Make sure the Google Drive link is public or accessible
                </div>
              </div>
            </div>
          )}
          
          {
            initialData.videoUrl && !isEditing && (
              <div className="text-xs text-muted-foreground mt-2">
                 Videos Can Take Few Moments to process. Refresh the page if video does not appear
              </div>
            )
          }
        </div>
    )
}