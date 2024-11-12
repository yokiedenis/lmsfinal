// components/Leaderboard.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';
import { Trophy, ArrowUp } from 'lucide-react';

const prisma = new PrismaClient();

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function fetchLeaderboardData() {
      try {
        const data = await getLeaderboardData();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    }

    fetchLeaderboardData();
  }, []);

  return (
    <div className="w-full px-4 sm:px-8 py-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 mb-6">
        Leaderboard
      </h1>
      <div className="space-y-4">
        {leaderboardData.map((student) => (
          <div
            key={student.rank}
            className="flex items-center justify-between bg-gray-800 rounded-md p-4 shadow-md hover:scale-105 transform transition duration-300 ease-out"
          >
            <div className="flex items-center space-x-4">
              <div className="rank flex items-center space-x-2">
                <Trophy color={student.rank === 1 ? '#FFD700' : '#BBB'} size={24} />
                <span className="text-lg font-semibold">{student.rank}</span>
              </div>
              <div className="name text-xl font-medium text-white">{student.name}</div>
            </div>
            <div className="score flex items-center space-x-2">
              <ArrowUp color="#28A745" size={24} />
              <span className="text-lg font-semibold">{student.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Fetch leaderboard data from database
async function getLeaderboardData(): Promise<LeaderboardEntry[]> {
  const usersWithScores = await prisma.user.findMany({
    include: {
      quizAttempts: true, // Include related quiz attempt scores for each user
    },
  });

  // Calculate total score for each user
  const leaderboardData = usersWithScores.map(user => ({
    name: user.name,
    score: user.quizAttempts.reduce((total, attempt) => total + attempt.score, 0),
  }));

  // Sort users by score in descending order and assign rank
  leaderboardData.sort((a, b) => b.score - a.score);
  return leaderboardData.map((user, index) => ({
    rank: index + 1,
    name: user.name,
    score: user.score,
  }));
}

export default Leaderboard;
