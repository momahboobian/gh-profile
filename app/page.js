"use client";
import React, { useState, useEffect } from "react";
import ProfileCard from "@components/ProfileCard";
import Loading from "@components/Loading";
import Search from "@components/Search";
import Logo from "@components/Logo";

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
    <div className="flex flex-col items-start min-h-screen p-4">
      <div className="flex w-full justify-center items-center p-4">
        <div className="flex-1 ">
          <Search search={search} setSearch={setSearch} />
        </div>
        <div className="shrink-0 ">
          <Logo />
        </div>
        <div className="flex-1 ">{/* Add button */}</div>
      </div>

      <div className="flex items-start justify-center "></div>
      <div className="flex flex-wrap items-center justify-between  ">
        {searchResults.length > 0
          ? searchResults.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))
          : data.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
      </div>
    </div>
  );
}
