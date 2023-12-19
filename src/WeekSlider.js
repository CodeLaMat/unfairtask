import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import "./App.css";

const WeekSlider = ({ weekLabel, onChange, onCheckChange, checked }) => {
  const marks = [
    { value: 0, label: "Sun" },
    { value: 1, label: "Mon" },
    { value: 2, label: "Tue" },
    { value: 3, label: "Wed" },
    { value: 4, label: "Thu" },
    { value: 5, label: "Fri" },
    { value: 6, label: "Sat" },
  ];

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <div className="weekLabel">{weekLabel}</div>
      <Checkbox
        checked={checked}
        onChange={(e) => onCheckChange(weekLabel, e.target.checked)}
      />
      <Slider
        disabled={!checked}
        defaultValue={[1, 5]}
        step={1}
        marks={marks}
        min={0}
        max={6}
        valueLabelDisplay="auto"
        onChange={(e, value) => onChange(weekLabel, value)}
      />
    </div>
  );
};

export default WeekSlider;
