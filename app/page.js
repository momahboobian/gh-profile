"use client";

import { useState, useEffect } from "react";
import ProfileCard from "@components/ProfileCard";

export default function Home() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("api/graduate");
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error(error);
        // Handle error here, e.g., show an error message to the user
      }
    };

    fetchProfiles();
  }, []);

  return (
    <main className="flex items-center justify-between min-h-screen p-10">
      <div className="flex flex-wrap items-center justify-between  ">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </main>
  );
}
