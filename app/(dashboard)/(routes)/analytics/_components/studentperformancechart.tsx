// 'use client';

// import {
//     Bar,
//     BarChart,
//     ResponsiveContainer,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
// } from "recharts";
// import { Card } from "@/components/ui/card";

// interface StudentPerformanceChartProps {
//     data: {
//         name: string;
//         avgScore: number;
//     }[];
// }

// export const StudentPerformanceChart = ({
//     data,
// }: StudentPerformanceChartProps) => {
//     return (
//         <Card className="bg-[#2C2C2C]"> {/* Dark background for the Card */}
//             <ResponsiveContainer width="100%" height={350}>
//                 <BarChart layout="vertical" data={data}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#444444" /> {/* Subtle grid lines */}
//                     <XAxis 
//                         type="number" 
//                         domain={[0, 100]} 
//                         stroke="#FFFFFF" // Change to white for visibility
//                         tickFormatter={(value) => `${value}%`} 
//                     />
//                     <YAxis 
//                         dataKey="name" 
//                         type="category" 
//                         stroke="#FFFFFF" // Change to white for visibility
//                     />
//                     <Tooltip 
//                         formatter={(value) => `${value}%`} 
//                         contentStyle={{ backgroundColor: '#444444', color: '#FFFFFF' }} // Custom tooltip style
//                     />
//                     <Legend wrapperStyle={{ color: '#FFFFFF' }} /> {/* Change legend text to white */}
//                     <Bar 
//                         dataKey="avgScore" 
//                         fill="#82ca9d" 
//                         barSize={20} 
//                         radius={[4, 4, 0, 0]} 


//                         isAnimationActive={true} // Enable live animation
//                     />
//                 </BarChart>
//             </ResponsiveContainer>
//         </Card>
//     );
// };
'use client';

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { Card } from "@/components/ui/card";

interface StudentPerformanceChartProps {
    data: {
        name: string;
        avgScore: number;
    }[];
}

export const StudentPerformanceChart = ({
    data,
}: StudentPerformanceChartProps) => {
    return (
        <Card className="bg-[#1A1A1A] p-4 rounded-lg"> {/* Darker background for the Card, padding, and rounded corners */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-lg font-semibold">Student Performance Chart</h2>
                <div className="flex space-x-2">
                    <button className="bg-[#2C2C2C] text-white px-2 py-1 rounded">This Year</button>
                    <button className="bg-green-500 text-white px-2 py-1 rounded">Download Info</button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart layout="vertical" data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                    <XAxis 
                        type="number" 
                        domain={[0, 100]} 
                        stroke="#FFFFFF" 
                        tickFormatter={(value) => `${value}%`} 
                    />
                    <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="#FFFFFF" 
                    />
                    <Tooltip 
                        formatter={(value) => `${value}%`} 
                        contentStyle={{ backgroundColor: '#444444', color: '#FFFFFF', border: 'none', borderRadius: '4px' }}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Legend wrapperStyle={{ color: '#FFFFFF' }} />
                    <Bar 
                        dataKey="avgScore" 
                        fill="#82ca9d" 
                        barSize={20} 
                        radius={[4, 4, 0, 0]} 
                        isAnimationActive={true}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};