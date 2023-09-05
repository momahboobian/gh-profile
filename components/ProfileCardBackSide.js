import React, { useState, useEffect } from "react";

export default function ProfileCardBackSide({ profile, isFlipped }) {
  const [commitsLastWeek, setCommitsLastWeek] = useState(0);
  const [commitsLastMonth, setCommitsLastMonth] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCommits = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/gitHubAPI?owner=${profile.github}`);
      const commitsData = await response.json();
      const totalCommits = commitsData.totalCommitsLastWeek;

      setCommitsLastWeek(totalCommits);

      // Fetch commits for last month
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const formattedDate = oneMonthAgo.toISOString().split("T")[0];

      const responseLastMonth = await fetch(
        `/api/gitHubAPI?owner=${profile.github}&since=${formattedDate}`
      );
      const commitsDataLastMonth = await responseLastMonth.json();
      const totalCommitsLastMonth =
        commitsDataLastMonth && commitsDataLastMonth.length > 0
          ? commitsDataLastMonth[0].total_count
          : 0;

      setCommitsLastMonth(totalCommitsLastMonth);
    } catch (error) {
      setError("Error fetching commits");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch commits only when the card is clicked
    if (profile.github && isFlipped) {
      fetchCommits();
    }
  }, [profile.github, isFlipped]);

  return (
    <div className="profile-card-back-side text-white">
      <div className="text-center text-lg">{profile.fullName}</div>
      <div className="text-center text-lg">
        <div>Progress of the user {profile.github}</div>
      </div>
      <div className="text-center text-lg">
        {isLoading ? (
          <div>Loading commits...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div>Commits for last week: {commitsLastWeek}</div>
            <div>Commits for last month: {commitsLastMonth}</div>
          </>
        )}
      </div>
    </div>
  );
}
