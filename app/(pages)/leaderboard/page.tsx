"use client"

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner} from "@nextui-org/react";
import Image from 'next/image';
import { FaCrown, FaMedal } from 'react-icons/fa';


const page = () => {
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [user, setUser] = useState(null);
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
        setUser(responseData?.user);


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
        return { color: 'gold', fontWeight: 600 }; // 1st position
      case 1:
        return { color: 'silver', fontWeight: 600 }; // 2nd position
      case 2:
        return { color: 'bronze', fontWeight: 600 }; // 3rd position
      default:
        return {}; // other positions
    }
  };

  const renderIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FaCrown className="text-gold" />;
      case 1:
        return <FaMedal className="text-silver" />;
      case 2:
        return <FaMedal className="text-bronze" />;
      default:
        return null;
    }
  };

  return (
    <div>
    {/* <h1>Leaderboard</h1> */}
    {loading ? (
      <div className='text-center p-32'>
        <Spinner label="Loading..." color="default" labelColor="foreground" />
      </div>
    ) : (
      <div className='p-5'>
        <div className='flex mb-10 p-3 rounded-xl border shadow-md justify-around items-center' >
          <div className=' flex  items-center justify-center ' >
            <div className=' mr-2 rounded-full overflow-hidden relative h-[60px] w-[60px] ' >
              <Image className=' w-full h-full object-cover ' fill={true} alt="your profile picture" src={user?.image} />
            </div>
            <div>
              <h2 className=' font-medium opacity-50 ' > {user?.userName} </h2>
              <p className=' font-semibold ' > {user?.university} </p>
            </div>
          </div>

          <div className='flex flex-col justify-center items-center ' >
            <div className=' font-semibold text-base opacity-80 ' >{userPosition !== null ? getOrdinal(userPosition) : 'N/A'}</div>
            <div className=' text-4xl font-bold ' > {user?.score} </div>
          </div>
        </div>

        <div className="  ">
          <Table
            aria-label="Leaderboard"
            style={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <TableHeader>
              <TableColumn>Rank</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>University</TableColumn>
              <TableColumn>Score</TableColumn>
            </TableHeader>
            <TableBody>
              {leaderboard.map((item, index) => (
                <TableRow className=' border-b xl:text-lg ' key={index} >
                  <TableCell >
                      <div style={getPositionStyle(index)}  className="py-2 flex  items-center capitalize"> 
                      {renderIcon(index)}
                      <span className="ml-2">{getOrdinal(index + 1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="py-2 capitalize">{item?.userName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="py-2 capitalize">{item?.university}</div>
                    </TableCell>
                    <TableCell >
                      <div className="py-2 capitalize font-semibold">{item?.score}</div>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )}
  </div>
  );
}

export default page;
