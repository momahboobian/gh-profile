"use client";

import React, { useState } from "react";
import ProfileCard from "@components/ProfileCard";
import data from "profile-db.json";

export default function Home() {
  const [profiles] = useState(data.graduate);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-5xl items-center justify-between text-sm lg:flex">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </main>
  );
}
