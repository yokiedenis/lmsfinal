import React, { useEffect, useState } from 'react';

interface LeaderboardEntry {
  name: string;
  email: string;
  totalScore: number;
  progressPercentage: number;
}

const StudentLeaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data: LeaderboardEntry[] = await response.json();
        console.log('Fetched data:', data);
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setError('Failed to load leaderboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        <p className="ml-4 text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-8">
        Student Leaderboard
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <th className="py-4 px-6 text-left font-semibold text-lg">Rank</th>
              <th className="py-4 px-6 text-left font-semibold text-lg">Name</th>
              <th className="py-4 px-6 text-left font-semibold text-lg">Email</th>
              <th className="py-4 px-6 text-center font-semibold text-lg">Total Score</th>
              <th className="py-4 px-6 text-center font-semibold text-lg">Progress (%)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr
                key={index}
                className="odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
              >
                <td className="py-4 px-6 font-bold text-lg">{index + 1}</td>
                <td className="py-4 px-6">{entry.name}</td>
                <td className="py-4 px-6">{entry.email}</td>
                <td className="py-4 px-6 text-center font-semibold">{entry.totalScore}</td>
                <td className="py-4 px-6 text-center">
                  <div className="relative w-full h-6 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-6 bg-blue-500 rounded-full"
                      style={{ width: `${entry.progressPercentage}%` }}
                    ></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                      {entry.progressPercentage.toFixed(1)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentLeaderboard;
