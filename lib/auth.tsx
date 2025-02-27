// "use server";

// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// export const Auth = async ({ children }: { children: React.ReactNode }) => {
//   const { userId } = await auth();
//   if (!userId) {
//     return redirect("/");
//   }

//   return children;
// };



"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const Auth = async ({ children }: { children: React.ReactNode }) => {
  const authResult = await auth();
  console.log("Auth Result in Auth component:", authResult);
  const { userId } = authResult;
  if (!userId) {
    return redirect("/");
  }

  return children;
};