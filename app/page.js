"use client";
import React, { useState, useEffect } from "react";
import ProfileCard from "@components/ProfileCard";
import Loading from "@components/Loading";
import Search from "@components/Search";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("search");

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

  //filters graduates from db which contains the search input(case insensitive)
  const searchResults = data.filter((el) =>
    el.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return loading ? (
    <Loading />
  ) : (
    <main className="flex flex-col items-start  justify-between min-h-screen p-10">
      <Search search={search} setSearch={setSearch} />
      <div className="flex flex-wrap items-center justify-between  ">
        {searchResults.length > 0
          ? searchResults.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))
          : data.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
      </div>
    </main>
  );
}
