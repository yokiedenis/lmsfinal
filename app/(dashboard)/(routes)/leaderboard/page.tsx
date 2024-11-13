"use client";
import { useEffect, useState } from "react";
import * as $ from "jquery"; // Import jQuery to enable DataTables

interface LeaderboardItem {
  rank: number;
  name: string;
  level: number;
  points: number;
}

function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();

        if (Array.isArray(data)) {
          setLeaderboardData(data);
        } else {
          setError("Unexpected data format");
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        setError("Failed to fetch leaderboard data");
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  useEffect(() => {
    // Initialize DataTables once the component is mounted
    if (leaderboardData.length) {
      if ($.fn.DataTable) { // Check if DataTable is available
        $("#leaderboardTable").DataTable({
          responsive: true, // Enable responsive design for different screen sizes
          paging: true,     // Enable pagination
          searching: true,  // Enable search functionality
          ordering: true,   // Enable sorting
          order: [[3, "desc"]], // Sort by points (descending)
          pageLength: 5,    // Set default page length to 5
          language: {
            search: "Filter records:", // Customize the search placeholder
          },
          animation: true,  // Enable animations (DataTables handles animations automatically)
        });
      } else {
        console.error("DataTable plugin is not loaded correctly.");
      }
    }

    // Cleanup DataTables initialization when component unmounts
    return () => {
      if ($.fn.DataTable && $.fn.DataTable.isDataTable("#leaderboardTable")) {
        $("#leaderboardTable").DataTable().destroy();
      }
    };
  }, [leaderboardData]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <table id="leaderboardTable" className="display" width="100%">
        <thead>
          <tr >
            <th style={{ backgroundColor: '#fcb61a', color:'blue' }}>Rank</th>
            <th style={{ backgroundColor: '#fcb61a', color:'blue' }}>Name</th>
            <th style={{ backgroundColor: '#fcb61a', color:'blue' }}>Level</th>
            <th style={{ backgroundColor: '#fcb61a', color:'blue' }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr key={user.rank}>
              <td>{user.rank}</td>
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

export default LeaderboardPage;
