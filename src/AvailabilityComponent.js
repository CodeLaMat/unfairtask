import React, { useState } from "react";
import WeekSlider from "./WeekSlider";
import "./App.css";
import { Button, Box, Typography } from "@mui/material";
import AvailabilityMatcher from "./AvailabilityMatcher";

const AvailabilityComponent = () => {
  const [availability, setAvailability] = useState(Array(7).fill([1, 5]));
  const [checkedState, setCheckedState] = useState(Array(7).fill(true));
  const [savedSelections, setSavedSelections] = useState([]);
  const [friendsAvailability] = useState([
    { week: 0, days: [0, 2, 4] },
    { week: 1, days: [1, 3, 5] },
    { week: 2, days: [2, 4, 6] },
    { week: 3, days: [0, 1, 2] },
    { week: 4, days: [3, 4, 5] },
    { week: 5, days: [1, 2, 6] },
    { week: 6, days: [0, 4, 5] },
  ]);

  const handleSliderChange = (weekLabel, value) => {
    const weekNumber = parseInt(weekLabel.split(" ")[1]) - 1;
    const newAvailability = [...availability];
    newAvailability[weekNumber] = value;
    setAvailability(newAvailability);
  };

  const handleCheckChange = (weekLabel, checked) => {
    const weekNumber = parseInt(weekLabel.split(" ")[1]) - 1;
    const newCheckedState = [...checkedState];
    newCheckedState[weekNumber] = checked;
    setCheckedState(newCheckedState);
  };

  const handleSave = () => {
    const selections = availability.map((week, index) => {
      return {
        week: `Week ${index + 1}`,
        days: checkedState[index] ? week : [],
      };
    });
    setSavedSelections(selections);
    console.log("Saved Selections:", selections); //
  };

  const formatDays = (days) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day) => dayNames[day]).join(", ");
  };

  return (
    <div className="availability_container">
      <div className="friends_availability">
        <Box
          sx={{
            margin: 5,
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            Predefined data
          </Typography>
          <Typography variant="h6">Friend's Availability:</Typography>
          {friendsAvailability.map((week, index) => (
            <Typography key={index}>
              Week {week.week + 1}: {formatDays(week.days)}
            </Typography>
          ))}
        </Box>
      </div>
      <div className="availability_matcher">
        <AvailabilityMatcher
          userAvailability={savedSelections}
          friendsAvailability={friendsAvailability}
        />
      </div>
      <div className="my_availabilities">
        {availability.map((_, index) => (
          <WeekSlider
            key={index}
            weekLabel={`Week ${index + 1}`}
            onChange={handleSliderChange}
            onCheckChange={handleCheckChange}
            checked={checkedState[index]}
          />
        ))}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Selections
        </Button>
      </div>
    </div>
  );
};

export default AvailabilityComponent;
