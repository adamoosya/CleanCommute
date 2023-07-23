import { SetStateAction, useState } from "react";
import { Fragment } from "react";
//import useBackendData from "./ServerInteract";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");

  const handleUsernameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (password === confirmPassword) {
      const registrationData = {
        username: username,
        password: password,
      };

      fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Registration failed");
          }
          console.log("Registration successful");
          return response.json(); // Parse the response JSON
        })
        .then((data) => {
          // Store the registered user's ID in the state
          setUserId(data.userId);
          window.location.href = "/profile";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <Fragment>
      <h2>Clean Commute Account Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Create Account
        </button>
      </form>
    </Fragment>
  );
};

export default RegistrationForm;
