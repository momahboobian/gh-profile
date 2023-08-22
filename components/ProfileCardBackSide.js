import React, { useState, useEffect } from "react";

export default function ProfileCardBackSide({ profile, isFlipped }) {
  const [commits, setCommits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCommits = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/gitHubAPI?owner=${profile.github}`);
      console.log(profile.github + " " + response.data);

      const commitsData = await response.json();
      const totalCommits =
        commitsData.length > 0 ? commitsData[0].total_count : 0;

      setCommits(commitsData);
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
      <div className="flex flex-col text-center text-lg">
        {profile.fullName}
      </div>
      <div className="flex flex-col text-center text-lg">
        <div>Progress of the user {profile.github}</div>
      </div>
      <div className="flex flex-col text-center text-lg">
        {isLoading ? (
          <div>Loading commits...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div>
              Commits for last week:{" "}
              {commits.length > 0 ? commits[0].total_count : 0}
            </div>
            <div>Average commits of last month</div>
          </>
        )}
      </div>
    </div>
  );
}
