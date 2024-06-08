"use client"

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';

const page = () => {
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    async function getStats() {
      try {
        setLoading(true);

        const response = await fetch(`/api/leaderboard`, {
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        setLeaderboard(responseData?.leaderboard);
        setUserPosition(responseData?.userPosition);

      } catch (error: any) {
        console.error("Error fetching data:", error?.message);
      } finally {
        setLoading(false);
      }
    }

    getStats();
  }, []);

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const getPositionStyle = (index: number) => {
    switch (index) {
      case 0:
        return { color: 'gold' }; // 1st position
      case 1:
        return { color: 'silver' }; // 2nd position
      case 2:
        return { color: 'bronze' }; // 3rd position
      default:
        return {}; // other positions
    }
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      <div>User position: {userPosition !== null ? getOrdinal(userPosition) : 'N/A'}</div>

      <div>
        {leaderboard.map((item, index) => (
          <div key={index} style={getPositionStyle(index)}>
            {getOrdinal(index + 1)} - {item?.userName} - {item?.university} - {item?.score}
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
