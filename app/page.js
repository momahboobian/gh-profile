"use client";
import React, { useState, useEffect } from "react";
import ProfileCard from "@components/ProfileCard";
import Loading from "@components/Loading";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchGraduates = async () => {
      try {
        const response = await fetch("/api/graduate");
        const data = await response.json();
        setData(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGraduates();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <main className="flex items-center justify-between min-h-screen p-10">
      <div className="flex flex-wrap items-center justify-between  ">
        {data.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </main>
  );
}
