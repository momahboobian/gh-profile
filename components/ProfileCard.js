import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function ProfileCard({ profile }) {
  return (
    <div className="flex-1 bg-neutral-800	rounded-lg shadow-md p-1 w-80">
      <div className="flex flex-col justify-between items-center whitespace-nowrap bg-black rounded-t-lg p-4">
        <img
          src={profile.avatar}
          alt={`Avatar of ${profile.fullName}`}
          className="w-28 h-28 rounded-lg mx-auto mb-2"
        />
        <h2 className="text-lg font-light">{profile.fullName}</h2>{" "}
      </div>
      <div className="flex flex-col justify-between items-center whitespace-nowrap p-4">
        <div className="flex justify-between items-center whitespace-nowrap gap-4">
          <div className="flex-1">
            <p className="text-center text-base">{profile.role}</p>
            <div className="text-center text-sm text-[#606467] font-light">
              Role
            </div>
          </div>
          <div className="flex-1">
            <p className="text-center text-base">{profile.cohort}</p>
            <div className="text-center text-sm text-[#606467] font-light">
              Cohort
            </div>
          </div>
        </div>

        <div className="flex items-center justify-around">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white h-[35px] transition duration-300 hover:scale-110 hover:text-[#37BCBA]"
          >
            <FontAwesomeIcon icon={faGithub} className="mr-1" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white h-[35px] transition duration-300 hover:scale-110 hover:text-[#37BCBA]"
          >
            <FontAwesomeIcon icon={faLinkedin} className="mr-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
