import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import ProfileCardBackSide from "@components/ProfileCardBackSide";

export default function ProfileCard({ profile }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center justify-around text-white bg-transparent p-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 ">
      <div className="w-[300px] md:w-[340px] h-[360px] bg-transparent perspective">
        <div
          className={`relative preserve-3d w-full h-full duration-1000 ${
            isFlipped ? "my-rotate-y-180" : ""
          }`}
          onClick={isFlipped ? handleFlip : undefined}
        >
          <div className="absolute w-full h-full bg-neutral-800 rounded-lg shadow-md p-1">
            {/* Front side content */}
            <div
              className="flex flex-col justify-between items-center whitespace-nowrap bg-black rounded-t-lg p-4 cursor-pointer"
              onClick={handleFlip}
            >
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

              <div className="flex items-center">
                <ul className="flex items-center justify-between gap-14 p-4">
                  <li className="group/tooltip">
                    <a href={profile.linkedin} target="_blank">
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="text-white h-[35px] transition duration-300 hover:scale-110 hover:text-[#37BCBA]"
                      />
                    </a>
                    <div className="invisible absolute bg-gray-900 text-gray-200 p-2 rounded-md shadow group-hover/tooltip:visible tooltip border border-slate-100 dark:bg-[#1A1E1F]">
                      LinkedIn
                    </div>
                  </li>
                  <li className="group/tooltip">
                    <a
                      href={`https://github.com/${profile.github}`}
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faGithub}
                        className="text-white h-[35px] transition duration-300 hover:scale-110 hover:text-[#37BCBA]"
                      />
                    </a>
                    <div className="invisible absolute bg-gray-900 text-gray-200 p-2 rounded-md shadow group-hover/tooltip:visible tooltip border border-slate-100 dark:bg-[#1A1E1F]">
                      GitHub
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back side content */}
          <div className="absolute my-rotate-y-180w-full h-full p-4 bg-neutral-800 rounded-lg shadow-md">
            {/* backface-hidden */}
            <ProfileCardBackSide profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}
