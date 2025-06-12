// _components/live-session-google-form-quiz-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";import { IconBadge } from "@/components/icon-badge";
import { ExternalLink } from "lucide-react";

interface LiveSessionGoogleFormQuizFormProps {
   initialData: { googleFormQuizUrl: string | null }; 
  courseId: string;
  sessionId: string;
}

export const LiveSessionGoogleFormQuizForm = ({
  initialData,
  courseId,
  sessionId,
}: LiveSessionGoogleFormQuizFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [googleFormQuizUrl, setGoogleFormQuizUrl] = useState(initialData.googleFormQuizUrl || "");
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/courses/${courseId}/liveclasses/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleFormQuizUrl }),
      });
      if (response.ok) {
        toast({ title: "Google Forms quiz URL updated" });
        toggleEdit();
        router.refresh();
      } else {
        toast({ title: "Something went wrong", variant: "destructive" });
      }
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Google Forms Quiz URL
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? "Cancel" : initialData.googleFormQuizUrl ? "Edit" : "Add"}
        </Button>
      </div>
      {!isEditing && !initialData.googleFormQuizUrl && (
        <p className="text-sm mt-2 text-slate-500 italic">No Google Forms quiz URL set</p>
      )}
      {!isEditing && initialData.googleFormQuizUrl && (
        <a
          href={initialData.googleFormQuizUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {initialData.googleFormQuizUrl}
        </a>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <Input
            value={googleFormQuizUrl}
            onChange={(e) => setGoogleFormQuizUrl(e.target.value)}
            placeholder="e.g., https://forms.gle/..."
            className="w-full"
          />
          <Button type="submit">Save</Button>
        </form>
      )}
    </div>
  );
};