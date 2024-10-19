import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function DELETE(
    req: Request,
    {params}:{params:{courseId: string , attachmentId: string}}
){
    try{
       const {userId} = auth();

       if(!userId){
        return new NextResponse("Unauthorized", {status: 401});
       }

       const course = await db.course.findUnique({
         where: {
            id: params.courseId,
            userId: userId
        }     
       });

       if(!course){
        return new NextResponse("Course Not Found", {status: 401});
       }

       const attachment = await db.attachment.findUnique({
         where: {
           courseId: params.courseId,
           id: params.attachmentId,
        }     
       });

    return NextResponse.json(attachment);

    }catch(error){
        console.log("ATTACHMENT_ID", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}