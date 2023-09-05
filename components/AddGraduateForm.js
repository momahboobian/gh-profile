"use client";
import { useState } from "react";

export default function AddGraduateForm({ data }) {
  const [fullName, setFullName] = useState("");
  const [gitHubUsername, setGitHubUsername] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [role, setRole] = useState("");
  const [cohort, setCohort] = useState("your cohort");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      className="absolute rounded-xl align-middle top-[23%] left-[35%]   flex flex-col align-center  z-40 bg-white p-8 text-[#606467] w-[30%] "
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
      />

      <label htmlFor="githubUsername">GitHub Username:</label>
      <input
        type="text"
        id="githubUsername"
        name="githubUsername"
        value={gitHubUsername}
        className="bg-[#f8f8f8]  border-2  border-solid	 p-2 rounded-md mb-7"
        onChange={(e) => setGitHubUsername(e.target.value)}
      />

      <label htmlFor="linkedin">LinkedIn:</label>
      <input
        type="text"
        id="linkedin"
        name="linkedin"
        className="bg-[#f8f8f8]  border-2  border-solid	 p-2 rounded-md mb-7"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
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
          />
        </div>
      </div>

      <p className="font-thin text-sm italic ">*All fields are required</p>

      <input
        type="submit"
        value="Submit"
        className=" p-4  bg-[#37BCBA] hover:bg-[#1a9997] font-medium rounded-md  my-[10%] text-center text-md text-white"
      />
    </form>
  );
}
