export default function ProfileCard({ profile }) {
  return (
    <div className="profile-card bg-neutral-800	rounded-lg shadow-md p-1 w-80">
      <div className="flex flex-col justify-between items-center bg-black rounded-t-lg p-4">
        <img
          src={profile.avatar}
          alt={`Avatar of ${profile.fullName}`}
          className="w-28 h-28 rounded-lg mx-auto mb-2"
        />
        <h2 className="text-lg ">{profile.fullName}</h2>{" "}
      </div>
      <div className="flex flex-col justify-between items-center p-4">
        <div className="mt-4 flex flex-col">
          <p>
            <span className="font-bold">Role:</span> {profile.role}
          </p>
          <p>
            <span className="font-bold">Cohort:</span> {profile.cohort}
          </p>
        </div>
        <div className="flex mt-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            LinkedIn
          </a>
        </div>
        <div className="mt-4">
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            CV
          </a>
          <a
            href={profile.coverLetter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            Cover Letter
          </a>
        </div>
        <div className="mt-4">
          <a
            href={profile.gitFP}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            GitHub FP
          </a>
          <a
            href={profile.demoFP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            Demo FP
          </a>
        </div>
      </div>
    </div>
  );
}
