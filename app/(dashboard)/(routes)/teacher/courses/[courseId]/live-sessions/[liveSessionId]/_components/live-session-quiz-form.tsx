// "use client";

// import { useState } from "react";

// interface LiveSessionQuizFormProps {
//   initialData: any;
//   courseId: string;
//   sessionId: string;
// }

// export const LiveSessionQuizForm = ({ initialData, courseId, sessionId }: LiveSessionQuizFormProps) => {
//   const [quizTitle, setQuizTitle] = useState(initialData?.title || "");
//   const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quiz Title</label>
//         <input
//           type="text"
//           value={quizTitle}
//           onChange={(e) => setQuizTitle(e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//         />
//       </div>
//       {questions.map((q, index) => (
//         <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-md bg-white dark:bg-gray-800">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Question {index + 1}</h3>
//           <textarea
//             value={q.question}
//             onChange={(e) => {
//               const newQuestions = [...questions];
//               newQuestions[index].question = e.target.value;
//               setQuestions(newQuestions);
//             }}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             placeholder="Enter the quiz question"
//           />
//           {q.options.map((option, optIndex) => (
//             <input
//               key={optIndex}
//               type="text"
//               value={option}
//               onChange={(e) => {
//                 const newQuestions = [...questions];
//                 newQuestions[index].options[optIndex] = e.target.value;
//                 setQuestions(newQuestions);
//               }}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               placeholder={`Option ${optIndex + 1}`}
//             />
//           ))}
//           <input
//             type="text"
//             value={q.correctAnswer}
//             onChange={(e) => {
//               const newQuestions = [...questions];
//               newQuestions[index].correctAnswer = e.target.value;
//               setQuestions(newQuestions);
//             }}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             placeholder="Enter the correct answer"
//           />
//         </div>
//       ))}
//       <button
//         onClick={handleAddQuestion}
//         className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
//       >
//         Add Question
//       </button>
//       <button
//         className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
//       >
//         Update Quiz
//       </button>
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quizzes</h3>
//         <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600 dark:text-gray-300">test</span>
//             <span className="text-sm">1 Question(s)</span>
//             <div className="flex space-x-2">
//               <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">Unassigned</span>
//               <span className="text-xs bg-green-200 dark:bg-green-800 px-2 py-1 rounded-full">Published</span>
//             </div>
//           </div>
//         </div>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Drag and Drop to Reorder the Quizzes</p>
//       </div>
//     </div>
//   );
// };













// "use client";

// import React, { useState, useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Trash } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { QuizList } from "./live-session-quiz-list";
// import { useRouter } from "next/navigation"; // Corrected import

// const formSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters long"),
//   questions: z
//     .array(
//       z.object({
//         text: z.string().min(5, "Question must be at least 5 characters long"),
//         options: z
//           .array(z.string().min(1, "Option cannot be empty"))
//           .min(4, "At least 4 options are required"),
//         correctAnswer: z.string().min(1, "Correct answer is required"),
//       })
//     )
//     .min(1, "At least one question is required"),
// });

// type Quiz = {
//   id: string;
//   title: string;
//   courseId: string;
//   liveSessionId: string;
//   isPublished: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   questions: { text: string; options: string[]; correctAnswer: string }[];
//   _count?: {
//     questions: number;
//   } | null;
// };

// export const LiveSessionQuizForm = ({
//   courseId,
//   liveSessionId,
//   initialQuizzes,
// }: {
//   courseId: string;
//   liveSessionId: string;
//   initialQuizzes: Quiz[];
// }) => {
//   const [isCreating, setIsCreating] = useState(false);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
//   const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const router = useRouter();

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       questions: [
//         {
//           text: "",
//           options: ["", "", "", ""],
//           correctAnswer: "",
//         },
//       ],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "questions",
//   });

//   // Autofill form when editing a quiz
//   useEffect(() => {
//     if (editingQuiz) {
//       form.reset({
//         title: editingQuiz.title,
//         questions: editingQuiz.questions.map((q) => ({
//           text: q.text,
//           options: q.options,
//           correctAnswer: q.correctAnswer,
//         })),
//       });
//       setIsFormVisible(true);
//     } else {
//       form.reset({
//         title: "",
//         questions: [{ text: "", options: ["", "", "", ""], correctAnswer: "" }],
//       });
//     }
//   }, [editingQuiz, form]);

//   // Update quizzes when initialQuizzes changes
//   useEffect(() => {
//     setQuizzes(initialQuizzes);
//   }, [initialQuizzes]);

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       setIsCreating(true);
//       if (editingQuiz) {
//         // Update existing quiz
//         await axios.put(
//           `/api/courses/${courseId}/livesessionquizzes/${editingQuiz.id}/update`,
//           {
//             ...values,
//             courseId,
//             liveSessionId,
//           }
//         );
//         toast.success("Live session quiz updated successfully!");
//       } else {
//         // Create new quiz
//         await axios.post(`/api/courses/${courseId}/livesessionquizzes`, {
//           ...values,
//           courseId,
//           liveSessionId,
//         });
//         toast.success("Live session quiz created successfully!");
//       }
//       form.reset();
//       setIsFormVisible(false);
//       setEditingQuiz(null);

//       // Refetch quizzes
//       const response = await axios.get(
//         `/api/courses/${courseId}/livesessionquizzes/fetch-livesessionquiz-course`,
//         {
//           params: {
//             liveSessionId,
//           },
//         }
//       );
//       // Transform response to match Quiz type
//       const fetchedQuizzes = response.data.map((quiz: any) => ({
//         ...quiz,
//         courseId, // Ensure courseId is included
//         questions: quiz.questions as { text: string; options: string[]; correctAnswer: string }[],
//         _count: {
//           questions: Array.isArray(quiz.questions) ? quiz.questions.length : 0,
//         },
//       }));
//       setQuizzes(fetchedQuizzes);
//       router.refresh();
//     } catch (error) {
//       toast.error("Failed to save live session quiz. Please try again.");
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const onReorder = async (updateData: { id: string; position: number }[]) => {
//     try {
//       setIsUpdating(true);
//       await axios.put(`/api/courses/${courseId}/livesessionquizzes/reorder`, {
//         list: updateData,
//       });
//       toast.success("Live session quizzes reordered successfully!");
//       router.refresh();
//     } catch {
//       toast.error("Something went wrong while reordering the quizzes");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <Button
//         type="button"
//         onClick={() => setIsFormVisible(!isFormVisible)}
//         className="w-full"
//       >
//         {isFormVisible ? "Hide Quiz Form" : "Create a Quiz for the Live Session"}
//       </Button>

//       {isFormVisible && (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Quiz Title" disabled={isCreating} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="space-y-6">
//               {fields.map((field, index) => (
//                 <QuestionForm
//                   key={field.id}
//                   questionIndex={index}
//                   field={field}
//                   remove={remove}
//                   fields={fields}
//                   form={form}
//                   isSubmitting={isCreating}
//                 />
//               ))}
//             </div>
//             <Button
//               type="button"
//               onClick={() =>
//                 append({
//                   text: "",
//                   options: ["", "", "", ""],
//                   correctAnswer: "",
//                 })
//               }
//               className="w-full"
//               disabled={isCreating}
//             >
//               Add Question
//             </Button>
//             <Button type="submit" className="w-full" disabled={isCreating}>
//               {isCreating
//                 ? editingQuiz
//                   ? "Updating..."
//                   : "Creating..."
//                 : editingQuiz
//                 ? "Update Quiz"
//                 : "Create Quiz"}
//             </Button>
//           </form>
//         </Form>
//       )}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold">Quizzes</h3>
//         {!isCreating && (
//           <div className="text-sm mt-2">
//             <QuizList
//               items={quizzes}
//               onReorder={onReorder}
//               onEdit={(quizId) => {
//                 const quiz = quizzes.find((q) => q.id === quizId);
//                 if (quiz) {
//                   setEditingQuiz(quiz);
//                   setIsFormVisible(true);
//                 }
//               }}
//             />
//           </div>
//         )}
//         {!isCreating && (
//           <p className="text-xs text-muted-foreground mt-4">
//             Drag and Drop to Reorder the Quizzes
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// const QuestionForm = ({
//   questionIndex,
//   field,
//   remove,
//   fields,
//   form,
//   isSubmitting,
// }: {
//   questionIndex: number;
//   field: any;
//   remove: (index: number) => void;
//   fields: any[];
//   form: any;
//   isSubmitting: boolean;
// }) => (
//   <div className="space-y-4 border p-4 rounded-md">
//     <div className="flex justify-between items-center">
//       <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
//       {fields.length > 1 && (
//         <Button
//           type="button"
//           variant="destructive"
//           onClick={() => remove(questionIndex)}
//           disabled={isSubmitting}
//         >
//           <Trash className="h-4 w-4" />
//         </Button>
//       )}
//     </div>
//     <FormField
//       control={form.control}
//       name={`questions.${questionIndex}.text`}
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <Textarea
//               placeholder="Enter question text"
//               disabled={isSubmitting}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//     {Array.from({ length: 4 }).map((_, optionIndex) => (
//       <FormField
//         key={optionIndex}
//         control={form.control}
//         name={`questions.${questionIndex}.options.${optionIndex}`}
//         render={({ field }) => (
//           <FormItem>
//             <FormControl>
//               <Input
//                 placeholder={`Option ${optionIndex + 1}`}
//                 disabled={isSubmitting}
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ))}
//     <FormField
//       control={form.control}
//       name={`questions.${questionIndex}.correctAnswer`}
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <Input
//               placeholder="Correct Answer"
//               disabled={isSubmitting}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   </div>
// );








"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Trash } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { QuizList } from "./live-session-quiz-list";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  questions: z
    .array(
      z.object({
        text: z.string().min(5, "Question must be at least 5 characters long"),
        options: z
          .array(z.string().min(1, "Option cannot be empty"))
          .min(4, "At least 4 options are required"),
        correctAnswer: z.string().min(1, "Correct answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});

type Quiz = {
  id: string;
  title: string;
  courseId: string;
  liveSessionId: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  questions: { text: string; options: string[]; correctAnswer: string }[];
  _count?: {
    questions: number;
  } | null;
};

export const LiveSessionQuizForm = ({
  courseId,
  liveSessionId,
  initialQuizzes,
}: {
  courseId: string;
  liveSessionId: string;
  initialQuizzes: Quiz[];
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      questions: [
        {
          text: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  // Autofill form when editing a quiz
  useEffect(() => {
    if (editingQuiz) {
      form.reset({
        title: editingQuiz.title,
        questions: editingQuiz.questions.map((q) => ({
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
        })),
      });
      setIsFormVisible(true);
    } else {
      form.reset({
        title: "",
        questions: [{ text: "", options: ["", "", "", ""], correctAnswer: "" }],
      });
    }
  }, [editingQuiz, form]);

  // Update quizzes when initialQuizzes changes
  useEffect(() => {
    setQuizzes(initialQuizzes);
  }, [initialQuizzes]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true);
      let response;
      if (editingQuiz) {
        // Update existing quiz
        response = await axios.put(
          `/api/courses/${courseId}/livesessionquizzes/${editingQuiz.id}`,
          {
            ...values,
            liveSessionId,
          }
        );
        toast.success("Live session quiz updated successfully!");
      } else {
        // Create new quiz
        response = await axios.post(`/api/courses/${courseId}/livesessionquizzes`, {
          ...values,
          liveSessionId,
        });
        toast.success("Live session quiz created successfully!");
      }

      form.reset();
      setIsFormVisible(false);
      setEditingQuiz(null);

      // Refetch quizzes
      const fetchResponse = await axios.get(
        `/api/courses/${courseId}/livesessionquizzes`,
        {
          params: {
            liveSessionId,
          },
        }
      );
      // Transform response to match Quiz type
      const fetchedQuizzes = fetchResponse.data.map((quiz: any) => ({
        ...quiz,
        courseId,
        questions: quiz.questions as { text: string; options: string[]; correctAnswer: string }[],
        _count: {
          questions: Array.isArray(quiz.questions) ? quiz.questions.length : 0,
        },
      }));
      setQuizzes(fetchedQuizzes);
      router.refresh();
    } catch (error) {
      toast.error("Failed to save live session quiz. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/livesessionquizzes/reorder`, {
        list: updateData,
      });
      toast.success("Live session quizzes reordered successfully!");
      router.refresh();
    } catch {
      toast.error("Something went wrong while reordering the quizzes");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8">
      <Button
        type="button"
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full"
      >
        {isFormVisible ? "Hide Quiz Form" : "Create a Quiz for the Live Session"}
      </Button>

      {isFormVisible && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Quiz Title" disabled={isCreating} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-6">
              {fields.map((field, index) => (
                <QuestionForm
                  key={field.id}
                  questionIndex={index}
                  field={field}
                  remove={remove}
                  fields={fields}
                  form={form}
                  isSubmitting={isCreating}
                />
              ))}
            </div>
            <Button
              type="button"
              onClick={() =>
                append({
                  text: "",
                  options: ["", "", "", ""],
                  correctAnswer: "",
                })
              }
              className="w-full"
              disabled={isCreating}
            >
              Add Question
            </Button>
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating
                ? editingQuiz
                  ? "Updating..."
                  : "Creating..."
                : editingQuiz
                ? "Update Quiz"
                : "Create Quiz"}
            </Button>
          </form>
        </Form>
      )}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Quizzes</h3>
        {!isCreating && (
          <div className="text-sm mt-2">
            <QuizList
              items={quizzes}
              onReorder={onReorder}
              onEdit={(quizId) => {
                const quiz = quizzes.find((q) => q.id === quizId);
                if (quiz) {
                  setEditingQuiz(quiz);
                  setIsFormVisible(true);
                }
              }}
            />
          </div>
        )}
        {!isCreating && (
          <p className="text-xs text-muted-foreground mt-4">
            Drag and Drop to Reorder the Quizzes
          </p>
        )}
      </div>
    </div>
  );
};

const QuestionForm = ({
  questionIndex,
  field,
  remove,
  fields,
  form,
  isSubmitting,
}: {
  questionIndex: number;
  field: any;
  remove: (index: number) => void;
  fields: any[];
  form: any;
  isSubmitting: boolean;
}) => (
  <div className="space-y-4 border p-4 rounded-md">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
      {fields.length > 1 && (
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(questionIndex)}
          disabled={isSubmitting}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </div>
    <FormField
      control={form.control}
      name={`questions.${questionIndex}.text`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea
              placeholder="Enter question text"
              disabled={isSubmitting}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    {Array.from({ length: 4 }).map((_, optionIndex) => (
      <FormField
        key={optionIndex}
        control={form.control}
        name={`questions.${questionIndex}.options.${optionIndex}`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={`Option ${optionIndex + 1}`}
                disabled={isSubmitting}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
    <FormField
      control={form.control}
      name={`questions.${questionIndex}.correctAnswer`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder="Correct Answer"
              disabled={isSubmitting}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);