import React from 'react';
import { Button } from "@/components/ui/button";

interface CertificateProps {
  userName: string; // Add name prop
  score: number;
  totalQuestions: number;
  onClose: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ userName, score, totalQuestions, onClose }) => {
  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      // Set the canvas size
      canvas.width = 800;
      canvas.height = 600;

      // Draw background
      context.fillStyle = '#f0f0f0';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Add certificate text
      context.fillStyle = '#333';
      context.font = '40px Arial';
      context.textAlign = 'center';
      context.fillText('Certificate of Completion', canvas.width / 2, 100);
      context.font = '30px Arial';
      context.fillText('This certifies that', canvas.width / 2, 200);
      context.fillText(userName, canvas.width / 2, 250); // Display the user's name
      context.fillText('You have completed the quiz', canvas.width / 2, 300);
      context.fillText(`Score: ${score} out of ${totalQuestions}`, canvas.width / 2, 400);
      context.fillText('Congratulations!', canvas.width / 2, 500);

      // Create a link to download the canvas as an image
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <h2 className="font-bold text-lg">Congratulations!</h2>
        <p>You have successfully passed the quiz!</p>

        {/* Display the certificate image with dynamic content */}
        <div className="relative my-4">
          <img
            src="/certificate-template.png" // Path to your certificate image
            alt="Certificate"
            className="w-full h-auto rounded"
          />
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 className="text-2xl font-bold">{userName}</h3>
            <p className="text-lg">Score: {score} out of {totalQuestions}</p>
          </div>
        </div>

        <Button onClick={handleDownload} className="mt-4 bg-green-500 hover:bg-green-600">
          Download Certificate
        </Button>
        <Button onClick={onClose} className="mt-2 bg-red-500 hover:bg-red-600">
          Close
        </Button>
      </div>
    </div>
  );
};

export default Certificate;

