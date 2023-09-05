"use client";
import { useState } from "react";

export default function AddGraduateForm() {
  const [fullName, setFullName] = useState("");
  const [gitHubUsername, setGitHubUsername] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [role, setRole] = useState("");
  const [cohort, setCohort] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGraduate = {
        fullName: "lala",
        github: "nataliiazab",
        avatar: "https://avatars.githubusercontent.com/u/113237479?v=4",
        linkedin: "https://www.linkedin.com/in/nataliia-zablotska/",
        role: "Full-Stack",
        cohort: "LDN-9",
        CV: null,
        coverLetter: null,
        gitFP: null,
        demoFP: null,
      };

      const response = await fetch("/api/addMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGraduate),
      });
      const data = await response.json();
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
        onChange={(e) => setFullName(e.target.value)}
      />

      <label htmlFor="githubUsername">GitHub Username:</label>
      <input
        type="text"
        id="githubUsername"
        name="githubUsername"
        value={gitHubUsername}
        onChange={(e) => setGitHubUsername(e.target.value)}
      />

      <label htmlFor="linkedin">LinkedIn:</label>
      <input
        type="text"
        id="linkedin"
        name="linkedin"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
      />

      <label htmlFor="role">Role:</label>
      <input
        type="text"
        id="role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <label htmlFor="cohort">Cohort:</label>
      <input
        type="text"
        id="cohort"
        name="cohort"
        className="bg-[#606467]"
        value={cohort}
        onChange={(e) => setCohort(e.target.value)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
}
