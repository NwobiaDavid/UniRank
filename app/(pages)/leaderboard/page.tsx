"use client"

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'

const page = () => {

  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userPosition, setUserPosition] = useState(null);


  useEffect(() => {

    async function getStats(){
      try{
        setLoading(true);
  
        const response = await fetch (`/api/leaderboard`, {
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
        
  
      } catch (error:any){
        console.error("Error fetching data:", error?.message);
      }

    }

    getStats();
    
  }, [])

  return (
    <div>
      leaderboard
      <div>user position: {userPosition}</div>

      <div>
        leaderboard
      </div>
      {leaderboard.map((item, index)=>(
        <div key={index} >
          {index+1}
          {item?.userName}
          {item?.university}
          {item?.score}
        </div>
      ))}
    </div>
  )
}

export default page
