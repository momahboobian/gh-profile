import { useState, useEffect } from "react";
import { useCommitContext } from "@utils/CommitContext";

export default function ProfileCardBackSide({ profile, isFlipped }) {
  const [commitsLastWeek, setCommitsLastWeek] = useState(0);
  const [commitsLastMonth, setCommitsLastMonth] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { commitData, updateCommitData } = useCommitContext();

  const fetchCommits = async () => {
    setIsLoading(true);

    try {
      // Check if there's cached data and if it's not older than 15 minutes
      const cachedData = localStorage.getItem(`commitData_${profile.github}`);
      const cachedTimestamp = localStorage.getItem(
        `commitDataTimestamp_${profile.github}`
      );

      if (cachedData && cachedTimestamp) {
        const currentTime = new Date().getTime();
        const cachedTime = new Date(parseInt(cachedTimestamp)).getTime();
        const cacheExpiryTime = 15 * 60 * 1000; // 15 minutes

        if (currentTime - cachedTime < cacheExpiryTime) {
          const commitsData = JSON.parse(cachedData);
          setCommitsLastWeek(commitsData.totalCommitsLastWeek);
          setCommitsLastMonth(commitsData.totalCommitsLastMonth);
          setIsLoading(false);
          return;
        }
      }

      // If there's no cached data or it's expired, fetch new data from the API
      const response = await fetch(`/api/gitHubAPI?owner=${profile.github}`);
      const commitsData = await response.json();
      const totalCommitsLastWeek = commitsData.totalCommitsLastWeek;
      const totalCommitsLastMonth = commitsData.totalCommitsLastMonth;

      // Update the cache with the fresh data
      localStorage.setItem(
        `commitData_${profile.github}`,
        JSON.stringify(commitsData)
      );
      localStorage.setItem(
        `commitDataTimestamp_${profile.github}`,
        new Date().getTime()
      );

      setCommitsLastWeek(totalCommitsLastWeek);
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
    <div className="flex flex-col w-full h-full justify-between text-white">
      <h2 className="text-center text-lg">{profile.fullName}</h2>
      <div className="flex justify-between text-sm text-gray-500">
        <p className="text-lg mr-6">Progress</p>
        <div className="flex items-center mr-2">
          <div className="w-3 h-3 rounded-full bg-teal-200 mr-2"></div>
          <p>Above</p>
        </div>
        <div className="flex items-center mr-2">
          <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
          <p>Meeting</p>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-teal-900 mr-2"></div>
          <p>Below</p>
        </div>
      </div>

      <div className="flex justify-between py-2">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="w-6 h-10 bg-teal-900" // Add your desired color here
          ></div>
        ))}
      </div>

      <div className="flex justify-between mb-4 text-sm text-gray-500">
        <div>8 weeks</div>
        <div>--------</div>
        <div>26% Progress</div>
        <div>--------</div>
        <div>Today</div>
      </div>

      <h3 className="text-center text-lg mb-2">Commits</h3>
      <div className="text-base p-4 bg-black rounded-lg shadow-md ">
        <div className="text-center text-base">
          {isLoading ? (
            <div>Loading commits...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              <div className="flex justify-between mx-2">
                <div>Last Week:</div>
                <div className="text-2xl mx-2">{commitsLastWeek}</div>
              </div>
              <div className="flex justify-between mx-2 mt-6">
                <div>Last Month:</div>
                <div className="text-2xl mx-2">{commitsLastMonth}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
