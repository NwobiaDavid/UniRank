/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import React, { useEffect, useState } from 'react'

export const page = () => {
     const [leaderboard, setLeaderboard] = useState([]);


  useEffect(() => {
  async function getLeaderboard(){
    try {
      const response = fetch('/api/leaderboard', {
        method:"GET",
        headers: {
          "Content-Type": "application/json",
      }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
  
    const responseData = await response.json();
    setLeaderboard(responseData?.leaderboard)
     } catch (error) {
      console.error("Error fetching data:", error);
      
     }
  }

  getLeaderboard()
  }, []);
  return (
    <div>
        <div className='fixed top-0 max-h-[7%] ' >

        </div>
      <div className='  ' >
          <h1>Leaderboard</h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>university</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.userName}</td>
                  <td>{entry.university}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  )
}
