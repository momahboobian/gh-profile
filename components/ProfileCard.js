import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function ProfileCard({ profile }) {
  return (
    <div className="flex flex-col justify-around text-white p-2 rounded-2xl transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex-1 bg-neutral-800 rounded-lg shadow-md p-1 w-full sm:w-[320px] md:w-[360px]">
        <div className="flex flex-col justify-between items-center whitespace-nowrap bg-black rounded-t-lg p-4">
          <img
            src={profile.avatar}
            alt={`Avatar of ${profile.fullName}`}
            className="w-28 h-28 rounded-lg mx-auto mb-2"
            width={200}
            height={200}
          />
          <h2 className="text-lg font-light">{profile.fullName}</h2>{" "}
        </div>
        <div className="flex flex-col justify-between items-center whitespace-nowrap p-4">
          <div className="flex justify-between items-center gap-6">
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

          <div className="">
            <ul className="flex items-center justify-between gap-4 p-4">
              <li className="">
                <a href={profile.linkedin} target="_blank">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="text-white h-[35px] transition duration-300 hover:scale-110 hover:text-[#37BCBA]"
                  />
                </a>
                <div className="invisible absolute bg-gray-900 text-gray-200 p-2 rounded-md shadow group-hover:visible tooltip border border-slate-100 dark:bg-[#1A1E1F] ">
                  something
                </div>
              </li>
              <li className="">
                <a
                  href={`https://github.com/${profile.github}`}
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="text-white h-[35px] transition duration-300 hover:scale-110 hover:text-[#37BCBA]"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
