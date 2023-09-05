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
      const totalCommitsLastWeek = commitsData.totalCommitsLastWeek;
      setCommitsLastWeek(totalCommitsLastWeek);

      const totalCommitsLastMonth = commitsData.totalCommitsLastMonth;
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
