"use client";

import { LiveSession } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil, Video } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface LiveSessionsListProps {
  items: LiveSession[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const LiveSessionsList = ({
  items,
  onReorder,
  onEdit,
}: LiveSessionsListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sessions, setSessions] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSessions(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sessions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedSessions = items.slice(startIndex, endIndex + 1);

    setSessions(items);

    const bulkUpdateData = updatedSessions.map((session) => ({
      id: session.id,
      position: items.findIndex((item) => item.id === session.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sessions">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {sessions.map((session, index) => (
              <Draggable
                key={session.id}
                draggableId={session.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      session.isPublished &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        session.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <Video className="h-4 w-4" />
                    {session.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {session.isPublished ? (
                        <Badge className="bg-sky-700">Published</Badge>
                      ) : (
                         <Badge className="bg-slate-500">Draft</Badge>
                      )}
                      <Pencil
                        onClick={() => onEdit(session.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};