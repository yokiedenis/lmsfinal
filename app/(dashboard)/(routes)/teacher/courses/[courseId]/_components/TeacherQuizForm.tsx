"use client";

import * as z from "zod";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Props interface for TeacherQuizForm
interface TeacherQuizFormProps {
  courseId: string; // Course ID prop to identify the course
}

// Zod schema for form validation
const formSchema = z.object({
  title: z.string().min(1, "Quiz title is required"), // Validate quiz title
  questions: z
    .array(
      z.object({
        questionText: z.string().min(1, "Question is required"), // Validate question text
        options: z.array(z.string()).min(4, "You must provide at least 4 options"), // Validate options
        correctAnswer: z.string().min(1, "Correct answer is required"), // Validate correct answer
      })
    )
    .min(1, "You must add at least one question"), // At least one question required
});

// TeacherQuizForm component definition
export const TeacherQuizForm = ({ courseId }: TeacherQuizFormProps) => {
  const [isCreating, setIsCreating] = useState(false); // State to track quiz creation
  const router = useRouter(); // Router for navigation

  // Setup form with React Hook Form and Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      questions: [
        {
          questionText: "",
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

  const { isSubmitting, isValid } = form.formState; // Destructure form state

  const toggleCreating = () => setIsCreating((current) => !current); // Toggle creating state

  // Submit handler for the form
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true); // Set creating state
    try {
      const payload = {
        title: values.title,
        questions: values.questions.map((question) => ({
          text: question.questionText, // Ensure correct mapping
          options: question.options,
          correctAnswer: question.correctAnswer,
        })),
      };

      console.log("Payload being sent to API:", payload); // Log the payload

      const response = await axios.post(`/api/courses/${courseId}/quizzes`, payload);
      
      // Check for success response
      if (response.status === 201) {
        toast.success("Quiz created successfully"); // Success message
        router.refresh(); // Refresh the router
      } else {
        throw new Error('Quiz creation failed');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle the Axios error response
        console.error("Failed to create quiz:", error.response?.data || error);
        toast.error("Failed to create quiz: " + (error.response?.data?.message || "Unknown error")); // Error message
      } else {
        // Handle a generic error
        console.error("Failed to create quiz:", error);
        toast.error("Failed to create quiz");
      }
    } finally {
      setIsCreating(false); // Reset creating state
    }
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Create Quiz
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? <>Cancel</> : <><PlusCircle className="h-4 w-4 mr-2" /> Add Quiz</>}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter quiz title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fields.map((field, questionIndex) => (
              <div key={field.id} className="relative border p-4 rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Question {questionIndex + 1}</h3>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(questionIndex)}
                      className="text-red-600"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name={`questions.${questionIndex}.questionText`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          disabled={isSubmitting}
                          placeholder="Enter the quiz question"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  {form.watch(`questions.${questionIndex}.options`).map((_, optionIndex) => (
                    <FormField
                      key={optionIndex}
                      control={form.control}
                      name={`questions.${questionIndex}.options.${optionIndex}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder={`Option ${optionIndex + 1}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <FormField
                  control={form.control}
                  name={`questions.${questionIndex}.correctAnswer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="Enter the correct answer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                append({
                  questionText: "",
                  options: ["", "", "", ""],
                  correctAnswer: "",
                })
              }
              className="mt-4"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add another question
            </Button>

            <Button disabled={!isValid || isSubmitting} type="submit">
              {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Create Quiz"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
