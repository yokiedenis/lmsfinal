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
        <Card className="bg-[#2C2C2C]"> {/* Dark background for the Card */}
            <ResponsiveContainer width="100%" height={350}>
                <BarChart layout="vertical" data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444444" /> {/* Subtle grid lines */}
                    <XAxis 
                        type="number" 
                        domain={[0, 100]} 
                        stroke="#FFFFFF" // Change to white for visibility
                        tickFormatter={(value) => `${value}%`} 
                    />
                    <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="#FFFFFF" // Change to white for visibility
                    />
                    <Tooltip 
                        formatter={(value) => `${value}%`} 
                        contentStyle={{ backgroundColor: '#444444', color: '#FFFFFF' }} // Custom tooltip style
                    />
                    <Legend wrapperStyle={{ color: '#FFFFFF' }} /> {/* Change legend text to white */}
                    <Bar 
                        dataKey="avgScore" 
                        fill="#82ca9d" 
                        barSize={20} 
                        radius={[4, 4, 0, 0]} 


                        isAnimationActive={true} // Enable live animation
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};
