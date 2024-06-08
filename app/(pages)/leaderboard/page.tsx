"use client"

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner} from "@nextui-org/react";


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

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  return (
    <div>
    <h1>Leaderboard</h1>
    {loading ? (
      <div className='text-center p-32'>
        <Spinner label="Loading..." color="default" labelColor="foreground" />
      </div>
    ) : (
      <>
        <div>User position: {userPosition !== null ? getOrdinal(userPosition) : 'N/A'}</div>
        <Table
          aria-label="Leaderboard"
          // css={{
          //   height: "auto",
          //   minWidth: "100%",
          // }}
        >
          <TableHeader>
            <TableColumn>Position</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>University</TableColumn>
            <TableColumn>Score</TableColumn>
          </TableHeader>
          <TableBody>
            {leaderboard.map((item, index) => (
              <TableRow key={index} css={getPositionStyle(index)}>
                <TableCell>{getOrdinal(index + 1)}</TableCell>
                <TableCell>{item?.userName}</TableCell>
                <TableCell>{item?.university}</TableCell>
                <TableCell>{item?.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )}
  </div>
  );
}

export default page;
