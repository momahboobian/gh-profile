"use client";
import { useState } from "react";

export default function AddGraduateForm({ data }) {
  const [fullName, setFullName] = useState("Graduate Name");
  const [gitHubUsername, setGitHubUsername] = useState(
    "Graduate Github Username"
  );
  const [linkedin, setLinkedin] = useState("Graduate LinkedIn");
  const [role, setRole] = useState("Graduate Role");
  const [cohort, setCohort] = useState("Graduate Cohort");

  const handleClickCohort = () => {
    setCohort("");
  };
  const handleClickFullName = () => {
    setFullName("");
  };
  const handleClickGitHubUsername = () => {
    setGitHubUsername("");
  };
  const handleClickLinkedin = () => {
    setLinkedin("");
  };
  const handleClickRole = () => {
    setRole("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        fullName &&
        fullName !== "Graduate Name" &&
        gitHubUsername &&
        gitHubUsername !== "Graduate Github Username" &&
        linkedin &&
        linkedin !== "Graduate LinkedIn" &&
        role &&
        role !== "Graduate Role" &&
        cohort &&
        cohort !== "Graduate Cohort"
      ) {
        const newGraduate = {
          fullName: fullName,
          github: gitHubUsername,
          avatar:
            "https://raw.githubusercontent.com/1l0/identicon/master/example/identicons/default.png",
          linkedin: linkedin,
          role: role,
          cohort: cohort,
        };

        const response = await fetch("/api/addMember", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGraduate),
        });
        const data = await response.json();
        console.log("add member", data);
        data.push(newGraduate);
        if (response.ok) {
          console.log("Graduate data sent successfully", data);
          // Clear form fields
          setFullName("");
          setGitHubUsername("");
          setLinkedin("");
          setCV("");
          setCohort("");
          setRole("");
        }
      } else {
        console.error("Failed to send graduate data");
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <form
      id="graduateForm"
      className="absolute rounded-xl align-middle top-[20%] left-[35%]   flex flex-col align-center  z-40 bg-white p-8 text-[#606467] w-[30%] "
      onSubmit={handleSubmit}
    >
      <legend className="text-xl font-bold	 text-black">Add new Graduate</legend>
      <br />

      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={fullName}
        className="bg-[#f8f8f8]  border-2  border-solid	 p-2 rounded-md mb-7"
        onChange={(e) => setFullName(e.target.value)}
        onClick={handleClickFullName}
        required
      />

      <label htmlFor="githubUsername">GitHub Username:</label>
      <input
        type="text"
        id="githubUsername"
        name="githubUsername"
        value={gitHubUsername}
        className="bg-[#f8f8f8]  border-2  border-solid	 p-2 rounded-md mb-7"
        onChange={(e) => setGitHubUsername(e.target.value)}
        onClick={handleClickGitHubUsername}
        required
      />

      <label htmlFor="linkedin">LinkedIn:</label>
      <input
        type="text"
        id="linkedin"
        name="linkedin"
        className="bg-[#f8f8f8]  border-2  border-solid	 p-2 rounded-md mb-7"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        onClick={handleClickLinkedin}
        required
      />
      <div className=" flex  justify-around ">
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            className="bg-[#f8f8f8]  border-2  border-solid	 p-2 rounded-md mb-7 w-[90%] shrink"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onClick={handleClickRole}
            required
          />
        </div>

        <div>
          <label htmlFor="cohort">Cohort:</label>
          <input
            type="text"
            id="cohort"
            name="cohort"
            className="bg-[#f8f8f8]  border-2  border-solid	 p-2 rounded-md mb-7 w-[90%] shrink "
            value={cohort}
            onChange={(e) => setCohort(e.target.value)}
            onClick={handleClickCohort}
            required
          />
        </div>
      </div>

      <p className="font-thin text-sm italic ">*All fields are required</p>

      <input
        type="submit"
        value="Submit"
        className=" p-2 cursor-pointer bg-[#37BCBA] hover:bg-[#1a9997] font-medium rounded-md  my-[5%] text-center text-md text-white"
      />
    </form>
  );
}
