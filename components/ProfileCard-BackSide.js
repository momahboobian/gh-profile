// displaying the name and progress of the user
// on the back side of the profile card

export default function ProfileCardBackSide(profile) {
  const { fullName, github } = profile;
  return (
    <div className="profile-card-back-side text-white">
      <div className="flex flex-col text-center text-lg">{fullName}</div>
      {/* // displaying the progress of the user */}
      <div className="flex flex-col text-center text-lg">
        <div>Progress of the user {github}</div>
      </div>
      {/* // displaying commits for last week and average commits of last month */}
      <div className="flex flex-col text-center text-lg">
        <div>Commits for last week</div>
        <div>Average commits of last month</div>
      </div>
    </div>
  );
}
