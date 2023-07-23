import { useState, SetStateAction, useEffect } from "react";
import { Fragment } from "react";

interface UserData {
  username: string;
  preferences: string;
}

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Send a POST request to the backend for login authentication
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        // Check the response from the backend for login success or failure
        if (data.success) {
          console.log("Login successful");
          // Fetch user data after successful login
          fetch(`http://localhost:3000/user/${data.userId}`, {
            headers: {
              Authorization: data.token,
            },
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                throw new Error("Failed to fetch user data");
              }
            })
            .then((userData) => {
              setUserData(userData);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          console.log("Login failed");
        }
        console.log("Response body:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Render user data if available
  useEffect(() => {
    if (userData) {
      console.log("User data:", userData);
      // Use the user data in your app
    }
  }, [userData]);

  return (
    <Fragment>
      <h2>Clean Commute Login</h2>
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
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
