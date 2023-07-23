import React, { useState, useEffect } from "react";

function ProfileCreationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [picture, setPicture] = useState(null);
  const [role, setRole] = useState("");
  const [homeLocation, setHomeLocation] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [userData, setUserData] = useState(null); // Add this state variable
  const userId = "<userId>"; // Replace <userId> with the registered user's ID

  useEffect(() => {
    // Fetch the user data from the backend using the userId obtained from registration
    fetch(`http://localhost:3000/user/${userId}`, {
      headers: {
        Authorization: "Bearer <token>", // Replace <token> with your authentication token
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); // Empty dependency array to fetch the data only once

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Construct the user data object
    const formData = {
      firstName,
      lastName,
      phoneNumber,
      picture,
      role,
      homeLocation,
      workLocation,
    };

    fetch(`http://localhost:3000/user/${userId}/preferences`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer <token>", // Replace <token> with your authentication token
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user preferences");
        }
        console.log("User preferences updated");
        // Handle success or navigate to another page
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Reset the form fields
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setPicture(null);
    setRole("");
    setHomeLocation("");
    setWorkLocation("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </label>
      <br />
      <label>
        Picture:
        <input
          type="file"
          onChange={(event) => setPicture(event.target.files[0])}
        />
      </label>
      <br />
      <label>
        Role:
        <select value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="">Select Role</option>
          <option value="driver">Driver</option>
          <option value="passenger">Passenger</option>
        </select>
      </label>
      <br />
      <label>
        Home Location:
        <input
          type="text"
          value={homeLocation}
          onChange={(event) => setHomeLocation(event.target.value)}
        />
      </label>
      <br />
      <label>
        Work Location:
        <input
          type="text"
          value={workLocation}
          onChange={(event) => setWorkLocation(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Create Profile</button>
    </form>
  );
}

export default ProfileCreationForm;
