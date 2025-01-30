import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { Book, Calendar, User, Award, LogIn } from 'lucide-react'; // Import icons

interface UserDetailsProps {
  userDetails: {
    name: string;
    imageUrl: string;
    coursesEnrolled: number;
    lastLogin: Date;
    dateOfEnrollment: Date;
    studentLevel: number;
    certificatesEarned: number;
  }[];
}

export const UserDetails = ({ userDetails }: UserDetailsProps) => {
  return (
    <Card className="mt-6 shadow-lg border border-gray-700 bg-[#1e3a8a]"> 
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {userDetails.map((user, index) => (
            <div
              key={index}
              className="flex items-center space-x-6 p-4 hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              <Image
                src={user.imageUrl || '/avv.webp'} // Using OR operator to provide a fallback
                alt={user.name}
                width={60}
                height={60}
                className="rounded-full border-2 border-gray-600"
              />
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="space-y-2">
                  <p className="font-bold text-white flex items-center">
                    <User className="w-4 h-4 mr-2 text-white " />
                    {user.name}
                  </p>
                  <p className="text-sm text-white flex items-center">
                    <Book className="w-4 h-4 mr-2 text-white " />
                    Courses Enrolled: {user.coursesEnrolled}
                  </p>
                  <p className="text-sm text-white flex items-center">
                    <Award className="w-4 h-4 mr-2 text-white " />
                    Certificates Earned: {user.certificatesEarned}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white flex items-center">
                    <LogIn className="w-4 h-4 mr-2 text-white " />
                    Last Login: {user.lastLogin.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-white flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-white " />
                    Date of Enrollment: {user.dateOfEnrollment.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-white flex items-center">
                    <User className="w-4 h-4 mr-2 text-white " />
                    Student Level: {user.studentLevel}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};