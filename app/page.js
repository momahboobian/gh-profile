"use client";

import React, { useState } from "react";
import ProfileCard from "@components/ProfileCard";
import data from "profile-db.json";

export default function Home() {
  const [profiles] = useState(data.graduate);

  return (
    <main className="flex items-center justify-between min-h-screen p-10">
      <div className="flex items-center">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
      <div className="flex w-full max-w-5xl items-center justify-between text-sm lg:flex"></div>
    </main>
  );
}
