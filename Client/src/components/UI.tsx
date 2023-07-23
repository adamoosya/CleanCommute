import React from "react";

function UI() {
  const goToAccountSettings = () => {
    // Navigate to the account settings page
    console.log("Navigating to Account Settings");
  };

  const goToScheduledRides = () => {
    // Navigate to the scheduled rides page
    console.log("Navigating to Scheduled Rides");
  };

  const goToScheduleRide = () => {
    // Navigate to the schedule ride page
    console.log("Navigating to Schedule Ride");
  };

  return (
    <div>
      <h1>Main Page</h1>

      <button onClick={goToAccountSettings}>Account Settings</button>

      <button onClick={goToScheduledRides}>Scheduled Rides</button>

      <button onClick={goToScheduleRide}>Schedule Ride</button>
    </div>
  );
}

export default UI;
