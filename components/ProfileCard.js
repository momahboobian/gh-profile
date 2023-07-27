import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function ProfileCard({ profile }) {
  return (
    <div className="flex flex-col justify-around mb-6 p-1 pb-3 min-w-full sm:min-w-[345px] md:min-w-[360px] 2xl:min-w-[400px] h-[fit-content] text-white rounded-2xl transition-all duration-300 hover:transform hover:scale-105">
      <div className="grid bg-neutral-800	rounded-lg shadow-md p-1 w-80">
        <div className="flex flex-col justify-between items-center whitespace-nowrap bg-black rounded-t-lg p-4">
          <img
            src={profile.avatar}
            alt={`Avatar of ${profile.fullName}`}
            className="w-28 h-28 rounded-lg mx-auto mb-2"
          />
          <h2 className="text-lg font-light">{profile.fullName}</h2>{" "}
        </div>
        <div className="flex flex-col justify-between items-center whitespace-nowrap p-4">
          <div className="flex justify-between items-center whitespace-nowrap">
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

          <div className="flex items-center justify-between">
            <a href={profile.linkedin} target="_blank">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-white h-[35px] transition duration-300 hover:scale-110 hover:text-[#37BCBA]"
              />
            </a>
            <a href={profile.github} target="_blank">
              <FontAwesomeIcon
                icon={faGithub}
                className="text-white h-[35px] transition duration-300 hover:scale-110 hover:text-[#37BCBA]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
