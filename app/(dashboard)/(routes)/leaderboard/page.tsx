"use client"
import { useEffect, useState } from 'react';

interface User {
  name: string;
  points: number;
  level: number; 
}

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Data is not in expected array format:', data);
          setUsers([]); // Set to empty array if data is not an array
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setUsers([]); // Set to empty array on error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center animate__animated animate__fadeIn">
        Eduskill Student Leaderboard
      </h2>
      <div className="grid grid-cols-4 font-semibold text-yellow-400 border-b-2 pb-3 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-md animate__animated animate__fadeIn animate__delay-1s">
        <div>Rank</div>
        <div>User</div>
        <div>Points</div>
        <div>Level</div>
      </div>
      <div className="overflow-x-auto">
        {Array.isArray(users) ? (
          users.map((user, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-4 py-3 px-4 bg-white rounded-lg mb-4 shadow-md transform transition-transform hover:scale-105 duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-${index + 1}s`}
            >
              <div className="text-gray-800">#{index + 1}</div>
              <div className="text-gray-800 font-medium">{user.name}</div>
              <div className="text-gray-800">{user.points}</div>
              <div className="text-gray-800">Level {user.level}</div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No users data available or error occurred.</p>
        )}
      </div>
    </div>
  );
}