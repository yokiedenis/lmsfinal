// // app/api/users/route.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { db } from "@/lib/db";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const { name, email, role } = req.body;

//     try {
//       const newUser = await db.profile.create({
//         data: {
//           name,
//           email,
//           role,
//         },
//       });
//       res.status(201).json(newUser);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to create user" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
