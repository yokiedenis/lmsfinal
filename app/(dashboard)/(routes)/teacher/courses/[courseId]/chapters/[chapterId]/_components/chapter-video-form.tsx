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

//creating a form schema
const formSchema = z.object({
    videoUrl: z.string().min(1)
    // Add more fields as needed
});



export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}:ChapterVideoFormProps) => {
   
    const[isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

 
   
    const onSubmit =  async (values: z.infer<typeof formSchema>) => {
       try{
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated successfully");
            toggleEdit();
            router.refresh();
       }catch{
          toast.error("Something went wrong")
       }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
           <div className="font-medium flex items-center justify-between">
             Chapter Video
             <Button onClick={toggleEdit} variant="ghost">
                {isEditing && (
                    <>Cancel </>
                )}
                
                {!isEditing && !initialData.videoUrl && (
                  <>
                  <PlusCircle className="h-4 w-4 mr-2"/>
                  Add Video
                  </>
                )}

                {!isEditing && initialData.videoUrl && (
                <>
                <Pencil className="h-4 w-4 mr-2"/>
                Edit Video
                </>
            )}
             </Button>
           </div>

          {!isEditing && (
            !initialData.videoUrl ? (
              <div className="flex items-center justify-center h-60
              bg-slate-200 rounded-md
              ">
                <Video className="h-10 w-10 text-slate-500"/>

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
                      onSubmit({videoUrl:url});
                     }
               }}
              />
              <div className="text-xs text-muted-foreground mt-4">
                Upload this chapters video
              </div>


            </div>
          )}
          
          {
            initialData.videoUrl && !isEditing && (
              <div className="text-xs text-muted-foreground mt-2">
                 Videos Can Take Few Moments to process. Refresh the page if video does not appear
              </div>
            )}

        </div>
    )
 
}