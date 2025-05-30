// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
// import { format } from "date-fns";

// interface ActivityItem {
//   id: string;
//   userId: string;
//   userName: string;
//   action: string;
//   courseTitle?: string;
//   timestamp: Date;
// }

// interface RecentActivityProps {
//   data: ActivityItem[];
//   className?: string;
// }

// export const RecentActivity = ({ data, className }: RecentActivityProps) => {
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium text-blue-600">Recent Activity</CardTitle>
//         <Activity className="h-4 w-4 text-muted-foreground" />
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {data.map((activity) => (
//             <div key={activity.id} className="flex items-center">
//               <div className="space-y-1">
//                 <p className="text-sm font-medium leading-none">
//                   {activity.userName}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {activity.action}{" "}
//                   {activity.courseTitle && (
//                     <span className="font-medium">"{activity.courseTitle}"</span>
//                   )}
//                 </p>
//               </div>
//               <div className="ml-auto text-sm text-muted-foreground">
//                 {format(new Date(activity.timestamp), "MMM d, h:mm a")}
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };








// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Activity } from "lucide-react";
// import { format } from "date-fns";

// interface ActivityItem {
//     id: string;
//     userId: string;
//     userName: string;
//     action: string;
//     courseTitle?: string;
//     timestamp: Date;
// }

// interface RecentActivityProps {
//     data: ActivityItem[];
//     className?: string;
// }

// export const RecentActivity = ({ data, className }: RecentActivityProps) => {
//     return (
//         <Card className={className}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 "> {/* Changed pb-2 to pb-1 */}
//                 <CardTitle className="text-base font-medium text-blue-600 pb-2 mb-1">Recent Activity</CardTitle>
//                 <Activity className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//                 <div className="w-full overflow-auto h-full">
//                     <table className="w-full text-sm">
//                         <thead className="sticky top-0 bg-white border-b border-gray-200">
//                             <tr>
//                                 <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap">User</th>
//                                 <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap">Action</th>
//                                 <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap min-w-[180px]">Course Title</th>
//                                 <th className="px-4 py-2 text-right font-medium text-gray-500 whitespace-nowrap min-w-[120px]">Timestamp</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.map((activity) => (
//                                 <tr key={activity.id} className="border-b last:border-b-0 hover:bg-gray-50">
//                                     <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">
//                                         {activity.userName}
//                                     </td>
//                                     <td className="px-4 py-2 whitespace-nowrap text-gray-600">
//                                         {activity.action}
//                                     </td>
//                                     <td className="px-4 py-2 whitespace-nowrap text-gray-600">
//                                         {activity.courseTitle || "-"}
//                                     </td>
//                                     <td className="px-4 py-2 whitespace-nowrap text-right text-gray-500">
//                                         {format(new Date(activity.timestamp), "MMM d, h:mm a")}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 {data.length === 0 && (
//                     <p className="text-center text-muted-foreground py-4">No recent activity.</p>
//                 )}
//             </CardContent>
//         </Card>
//     );
// };





// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Activity } from "lucide-react";
// import { format } from "date-fns";

// interface ActivityItem {
//   id: string;
//   userId: string;
//   userName: string | null; // Full name from Clerk
//   email: string; // Email from Clerk
//   action: string;
//   courseTitle?: string;
//   timestamp: Date;
// }

// interface RecentActivityProps {
//   data: ActivityItem[];
//   className?: string;
// }

// export const RecentActivity = ({ data, className }: RecentActivityProps) => {
//   return (
//     <Card className={className}>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-base font-medium text-blue-600 pb-2 mb-1">Recent Activity</CardTitle>
//         <Activity className="h-4 w-4 text-muted-foreground" />
//       </CardHeader>
//       <CardContent>
//         <div className="w-full overflow-auto h-full">
//           <table className="w-full text-sm">
//             <thead className="sticky top-0 bg-white border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap">User</th>
//                 <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap">Action</th>
//                 <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap min-w-[180px]">Course Title</th>
//                 <th className="px-4 py-2 text-right font-medium text-gray-500 whitespace-nowrap min-w-[120px]">Timestamp</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((activity) => (
//                 <tr key={activity.id} className="border-b last:border-b-0 hover:bg-gray-50">
//                   <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">
//                     <div className="flex flex-col">
//                       <span>{activity.userName || "Unknown User"}</span>
//                       <span className="text-xs text-gray-500">{activity.email || "-"}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap text-gray-600">
//                     {activity.action}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap text-gray-600">
//                     {activity.courseTitle || "-"}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap text-right text-gray-500">
//                     {format(new Date(activity.timestamp), "MMM d, h:mm a")}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {data.length === 0 && (
//           <p className="text-center text-muted-foreground py-4">No recent activity.</p>
//         )}
//       </CardContent>
//     </Card>
//   );
// };



"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react"; // Import useState

interface ActivityItem {
  id: string;
  userId: string;
  userName: string | null; // Full name from Clerk
  email: string; // Email from Clerk
  action: string;
  courseTitle?: string;
  timestamp: Date;
}

interface RecentActivityProps {
  data: ActivityItem[];
  className?: string;
}

const ITEMS_PER_PAGE = 5;

export const RecentActivity = ({ data, className }: RecentActivityProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // Generate page numbers for display, e.g., 1, 2, 3, 4
  // You might want a more sophisticated pagination display for many pages (e.g., with ellipses)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determine start and end item numbers for "Showing X-Y of Z entries"
  const startItemNumber = data.length > 0 ? indexOfFirstItem + 1 : 0;
  const endItemNumber = Math.min(indexOfLastItem, data.length);


  return (
    <Card className={`${className} flex flex-col`}> {/* Ensure card can flex its content vertically */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-blue-600 pb-2 mb-1">Recent Activity</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between"> {/* Allow content to grow and space out table/pagination */}
        <div className="w-full overflow-x-auto"> {/* Table wrapper for horizontal scroll if needed */}
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white border-b border-gray-200 z-10"> {/* z-10 to keep header above content if parent has overflow */}
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap">User</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap">Action</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap min-w-[180px]">Course Title</th>
                <th className="px-4 py-2 text-right font-medium text-gray-500 whitespace-nowrap min-w-[120px]">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((activity) => (
                <tr key={activity.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">
                    <div className="flex flex-col">
                      <span>{activity.userName || "Unknown User"}</span>
                      <span className="text-xs text-gray-500">{activity.email || "-"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                    {activity.action}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                    {activity.courseTitle || "-"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right text-gray-500">
                    {format(new Date(activity.timestamp), "MMM d, h:mm a")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.length === 0 && (
          <p className="text-center text-muted-foreground py-4">No recent activity.</p>
        )}

        {data.length > ITEMS_PER_PAGE && (
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing {startItemNumber} to {endItemNumber} of {data.length} entries
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium
                  ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Previous
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium
                    ${currentPage === number ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium
                  ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {/* If total data is less than ITEMS_PER_PAGE but not zero, you might still want to show the "Showing X of Y entries" */}
        {data.length > 0 && data.length <= ITEMS_PER_PAGE && (
             <div className="mt-auto pt-4 flex items-center justify-start border-t border-gray-200">
                <div className="text-sm text-gray-700">
                    Showing {startItemNumber} to {endItemNumber} of {data.length} entries
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
};