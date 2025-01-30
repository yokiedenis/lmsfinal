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