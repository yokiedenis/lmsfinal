import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
    value: number;
    label: string;
    shouldFormat?: boolean;
}

export const DataCard = ({
    value,
    label,
    shouldFormat = true,
}: DataCardProps) => {
    return (
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-white font-semibold text-lg">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-white">
                    {shouldFormat ? formatPrice(value) : value}
                </div>
            </CardContent>
        </Card>
    );
};






// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { formatPrice, formatDuration } from "@/lib/format1";

// interface DataCardProps {
//     value: number;
//     label: string;
//     shouldFormat?: boolean;
//     isDuration?: boolean;  // Added to indicate if the value should be formatted as duration
// }

// export const DataCard = ({
//     value,
//     label,
//     shouldFormat = true,
//     isDuration = false,  // Default to false
// }: DataCardProps) => {
//     // Format the value based on whether it's a duration or a number to be formatted as currency
//     let formattedValue: string | number = value; // Changed to string | number
//     if (shouldFormat) {
//         formattedValue = isDuration ? formatDuration(value) : formatPrice(value);
//     }

//     return (
//         <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-white font-semibold text-lg">
//                     {label}
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="text-3xl font-bold text-white">
//                     {formattedValue}
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };