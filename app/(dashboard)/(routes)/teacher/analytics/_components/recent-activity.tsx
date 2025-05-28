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








import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { format } from "date-fns";

interface ActivityItem {
    id: string;
    userId: string;
    userName: string;
    action: string;
    courseTitle?: string;
    timestamp: Date;
}

interface RecentActivityProps {
    data: ActivityItem[];
    className?: string;
}

export const RecentActivity = ({ data, className }: RecentActivityProps) => {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 "> {/* Changed pb-2 to pb-1 */}
                <CardTitle className="text-base font-medium text-blue-600 pb-2 mb-1">Recent Activity</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-auto h-full">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-white border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap">User</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap">Action</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-500 whitespace-nowrap min-w-[180px]">Course Title</th>
                                <th className="px-4 py-2 text-right font-medium text-gray-500 whitespace-nowrap min-w-[120px]">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((activity) => (
                                <tr key={activity.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                    <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">
                                        {activity.userName}
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
            </CardContent>
        </Card>
    );
};