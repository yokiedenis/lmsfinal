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
} from 'recharts';

import { Card } from '@/components/ui/card';

interface ChartProps {
    data: {
        name: string;
        purchaseCount: number; // Updated to reflect number of purchases
    }[];
}

export const Chart = ({ data }: ChartProps) => {
    return (
        <Card className="bg-[#2C2C2C]"> {/* Set the background of the Card to a dark color */}
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444444" /> {/* Grid lines */}
                    <XAxis 
                        dataKey="name" 
                        stroke="#FFFFFF" // Change tick color to white
                        tickLine={false}
                        axisLine={{ stroke: '#FFFFFF' }} // Change axis line color to white
                    />
                    <YAxis 
                        stroke="#FFFFFF" // Change tick color to white
                        tickLine={false}
                        axisLine={{ stroke: '#FFFFFF' }} // Change axis line color to white
                        label={{ value: 'Purchases', angle: -90, position: 'insideLeft', fill: '#FFFFFF' }} // Update label color
                    />
                    <Tooltip formatter={(value) => `${value} purchases`} contentStyle={{ backgroundColor: '#444444', color: '#FFFFFF' }} />
                    <Legend wrapperStyle={{ color: '#FFFFFF' }} />
                    <Bar 
                        dataKey="purchaseCount" // Updated to use purchaseCount as dataKey
                        fill="#82ca9d" 
                        barSize={20}
                        radius={[4, 4, 4, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};
