"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { GripVertical, Pencil } from "lucide-react";

type Quiz = {
  id: string;
  title: string;
  courseId: string;
  liveSessionId: string;
  createdAt: Date;
  updatedAt: Date;
  questions: { text: string; options: string[]; correctAnswer: string }[];
  _count?: {
    questions: number;
  } | null;
};

export const QuizList = ({
  items,
  onReorder,
  onEdit,
}: {
  items: Quiz[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (quizId: string) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    const updateData = reorderedItems.map((item, index) => ({
      id: item.id,
      position: index,
    }));

    onReorder(updateData);
    setIsDragging(false);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setIsDragging(true)}>
      <Droppable droppableId="quizzes">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex items-center justify-between p-4 border rounded-md mb-2 bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <div {...provided.dragHandleProps}>
                        <GripVertical className="h-5 w-5 mr-2" />
                      </div>
                      <span>{item.title}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(item.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
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