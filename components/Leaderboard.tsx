import { useState, useEffect } from 'react';
import { ClerkProvider, useUser } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UserProgress {
  id: string;
  userId: string;
  name: string;
  level: number;
  points: number;
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<UserProgress[]>([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('/api/leaderboard');
        const data: UserProgress[] = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2 className="text-2xl font-bold text-center my-6">Leaderboard</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Level</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.level}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
