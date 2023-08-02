"use client";
import React, { useState, useEffect } from "react";
import ProfileCard from "@components/ProfileCard";

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
    <div className="flex justify-center items-center h-16 w-16 animate-spin">
      <svg
        className="text-black dark:text-white w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.992 2C6.467 2 2 6.486 2 12.062c0 4.79 2.99 8.851 7.172 10.344.525.101.716-.228.716-.504 0-.248-.009-1.135-.014-2.225-2.913.64-3.525-1.4-3.525-1.4-.474-1.202-1.157-1.523-1.157-1.523-.947-.648.073-.635.073-.635 1.048.073 1.597 1.08 1.597 1.08.93 1.596 2.446 1.133 3.04.867.094-.678.362-1.133.658-1.393-2.303-.257-4.723-1.16-4.723-5.16 0-1.138.396-2.067 1.048-2.796-.105-.257-.454-1.318.1-2.75 0 0 .873-.278 2.85 1.066A9.89 9.89 0 0112 4.79c.837.004 1.68.113 2.472.336 1.975-1.344 2.847-1.066 2.847-1.066.554 1.432.213 2.493.107 2.75.652.73 1.047 1.658 1.047 2.796 0 4.007-2.425 4.897-4.734 5.148.37.321.704.954.704 1.927 0 1.391-.012 2.513-.012 2.853 0 .28.188.609.72.504A12.034 12.034 0 0022 12.062C22 6.486 17.532 2 11.992 2z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="24" height="24" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    </div>
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
