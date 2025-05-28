// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// interface ProgressDistributionProps {
//   data: {
//     name: string;
//     value: number;
//   }[];
//   className?: string;
// }

// export const ProgressDistribution = ({ data,className }: ProgressDistributionProps) => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-md font-medium text-blue-600">Course Progress Distribution</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => 
//                   `${name}: ${(percent * 100).toFixed(0)}%`
//                 }
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip 
//                 formatter={(value) => [`${value} students`, "Count"]}
//               />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };









"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// Refined color palette for better visual appeal, matched to image
const COLORS = ['#8884D8', '#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Purple (Completed), Blue (0-25%), Green (26-50%), Yellow (51-75%), Orange (76-99%)

interface ProgressDistributionProps {
  data: {
    name: string;
    value: number;
  }[];
  className?: string;
}

export const ProgressDistribution = ({ data, className }: ProgressDistributionProps) => {
  // Calculate total to determine percentage for each slice accurately
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-1">
        <CardTitle className="text-xl font-semibold text-gray-800">Course Progress Distribution</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                // Conditional label rendering for clarity
                label={({ name, percent, value }) => {
                    // Only show label if percentage is significant enough to be readable
                    // You can adjust this threshold (e.g., 0.05 for 5%)
                    if (percent * 100 > 5) {
                        return `${name}: ${(percent * 100).toFixed(0)}%`;
                    }
                    return ''; // Don't render label for very small slices
                }}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="stroke-white stroke-[1px]"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} students`, name]}
                contentStyle={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  border: 'none',
                  fontSize: '14px',
                  padding: '10px'
                }}
                labelStyle={{ fontWeight: 'bold', color: '#333' }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
                formatter={(value) => <span className="text-gray-700 text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};