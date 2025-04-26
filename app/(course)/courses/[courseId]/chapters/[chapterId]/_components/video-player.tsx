// "use client";

// import axios from "axios";
// import MuxPlayer from "@mux/mux-player-react";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
//     playbackId?: string | null;
//     courseId: string;
//     chapterId: string;
//     nextChapterId?: string;
//     isLocked: boolean;
//     completeOnEnd: boolean;
//     title: string;
//   }

// export const VideoPlayer = ({
//     playbackId,
//     courseId,
//     chapterId,
//     nextChapterId,
//     isLocked,
//     completeOnEnd,
//     title,
// }: VideoPlayerProps) => {
//     const [isReady, setIsReady] = useState(false);
//     const router = useRouter();
//     const confetti = useConfettiStore();

//     const onEnd = async () => {
//         try {
//             if (completeOnEnd) {
//                 await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//                     isCompleted: true,
//                 });

//                 if (!nextChapterId) {
//                     confetti.onOpen();
//                 }

//                 toast.success("Progress updated");
//                 router.refresh();

//                 if (nextChapterId) {
//                     router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
//                 }
//             }
//         } catch {
//             toast.error("Something went wrong");
//         }
//     }

//     return (
//         <div className="relative aspect-video">
//             {!isReady && !isLocked && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-slate-800  dark:bg-slate-200">
//                     <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//                 </div>
//             )}
//             {isLocked && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-slate-800  dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//                     <Lock className="h-8 w-8" />
//                     <p className="text-sm">
//                         This chapter is locked
//                     </p>
//                 </div>
//             )}
//             {!isLocked && playbackId && (
//                 <MuxPlayer
//                     title={title}
//                     className={cn(
//                         !isReady && "hidden"
//                     )}
//                     onCanPlay={() => setIsReady(true)}
//                     onEnded={onEnd}
//                     autoPlay
//                     playbackId={playbackId}
//                 />
//             )}
//         </div>
//     )
// }








// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
//   playbackId?: string | null;
//   courseId: string;
//   chapterId: string;
//   nextChapterId?: string;
//   isLocked: boolean;
//   completeOnEnd: boolean;
//   title: string;
// }

// export const VideoPlayer = ({
//   playbackId,
//   courseId,
//   chapterId,
//   nextChapterId,
//   isLocked,
//   completeOnEnd,
//   title,
// }: VideoPlayerProps) => {
//   const [isReady, setIsReady] = useState(false);
//   const router = useRouter();
//   const confetti = useConfettiStore();

//   const onEnd = async () => {
//     try {
//       if (completeOnEnd) {
//         await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//           isCompleted: true,
//         });

//         if (!nextChapterId) {
//           confetti.onOpen();
//         }

//         toast.success("Progress updated");
//         router.refresh();

//         if (nextChapterId) {
//           router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
//         }
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   // Construct the Google Drive embed URL from the playbackId (file ID or URL)
//   const googleDriveEmbedUrl = playbackId
//     ? `https://drive.google.com/file/d/${extractGoogleDriveFileId(playbackId)}/preview`
//     : "";

//   return (
//     <div className="relative aspect-video">
//       {!isReady && !isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
//           <Loader2 className="h-8 w-8 animate-spin text-secondary" />
//         </div>
//       )}
//       {isLocked && (
//         <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
//           <Lock className="h-8 w-8" />
//           <p className="text-sm">This chapter is locked</p>
//         </div>
//       )}
//       {!isLocked && playbackId && (
//         <iframe
//           title={title}
//           className={cn(!isReady && "hidden")}
//           src={googleDriveEmbedUrl}
//           allow="autoplay; fullscreen"
//           frameBorder="0"
//           allowFullScreen
//           onLoad={() => setIsReady(true)}
//           style={{ width: "100%", height: "100%" }}
//         />
//       )}
//     </div>
//   );
// };

// // Helper function to extract Google Drive file ID from a URL or ID
// function extractGoogleDriveFileId(urlOrId: string): string {
//   // If it's already a file ID (e.g., "1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g"), return it directly
//   if (!urlOrId.includes("http")) {
//     return urlOrId;
//   }

//   // Example: Extract file ID from "https://drive.google.com/file/d/1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g/view?usp=sharing"
//   const match = urlOrId.match(/\/d\/([^/]+)(?:\/|$)/);
//   return match ? match[1] : urlOrId; // Return the file ID or the full URL if no match
// }








"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  playbackId?: string | null;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  videoUrl?: string | null;
  googleDriveUrl?: string | null;
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
  videoUrl,
  googleDriveUrl,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const [videoSource, setVideoSource] = useState<"mux" | "google-drive" | "direct" | null>(null);
  const router = useRouter();
  const confetti = useConfettiStore();

  useEffect(() => {
    // Determine the video source type
    if (playbackId) {
      setVideoSource("mux");
    } else if (googleDriveUrl) {
      setVideoSource("google-drive");
    } else if (videoUrl) {
      setVideoSource("direct");
    } else {
      setVideoSource(null);
    }
  }, [playbackId, googleDriveUrl, videoUrl]);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Construct the Google Drive embed URL from the playbackId (file ID or URL)
  const getGoogleDriveEmbedUrl = (url: string) => {
    const fileId = extractGoogleDriveFileId(url);
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <>
          {videoSource === "mux" && playbackId && (
            <MuxPlayer
              playbackId={playbackId}
              onLoadedData={() => setIsReady(true)}
              onEnded={onEnd}
              className={cn(!isReady && "hidden")}
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {videoSource === "google-drive" && googleDriveUrl && (
            <iframe
              title={title}
              className={cn(!isReady && "hidden")}
              src={getGoogleDriveEmbedUrl(googleDriveUrl)}
              allow="autoplay; fullscreen"
              frameBorder="0"
              allowFullScreen
              onLoad={() => setIsReady(true)}
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {videoSource === "direct" && videoUrl && (
            <video
              controls
              onCanPlay={() => setIsReady(true)}
              onEnded={onEnd}
              className={cn(!isReady && "hidden")}
              style={{ width: "100%", height: "100%" }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </>
      )}
    </div>
  );
};

// Helper function to extract Google Drive file ID from a URL or ID
function extractGoogleDriveFileId(urlOrId: string): string {
  // If it's already a file ID (e.g., "1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g"), return it directly
  if (!urlOrId.includes("http")) {
    return urlOrId;
  }

  // Example: Extract file ID from "https://drive.google.com/file/d/1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g/view?usp=sharing"
  const match = urlOrId.match(/\/d\/([^/]+)(?:\/|$)/);
  return match ? match[1] : urlOrId; // Return the file ID or the full URL if no match
}