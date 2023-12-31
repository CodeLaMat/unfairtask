import React, { useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteIcon from "@mui/icons-material/Delete";

const AvailabilityMatcher = ({ userAvailability, friendsAvailability }) => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [showAllWeeks, setShowAllWeeks] = useState(false);

  const findMatchingWeeks = () => {
    return userAvailability
      .map((userWeek, index) => {
        const friendWeek = friendsAvailability[index];
        const commonDays = userWeek.days.filter((day) =>
          friendWeek.days.includes(day)
        );
        return commonDays.length > 0
          ? { week: userWeek.week, days: commonDays }
          : null;
      })
      .filter((week) => week !== null);
  };

  const matchingWeeks = findMatchingWeeks();

  const navigateWeeks = (direction) => {
    setCurrentWeekIndex((prevIndex) => {
      if (direction === "next" && prevIndex < matchingWeeks.length - 1) {
        return prevIndex + 1;
      } else if (direction === "prev" && prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };
  const toggleShowAllWeeks = () => {
    setShowAllWeeks(!showAllWeeks);
  };

  const formatDays = (days) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day) => dayNames[day]).join(", ");
  };
  return (
    <div>
      <h3>Matched Availability</h3>
      {matchingWeeks.length > 0 ? (
        <div>
          {!showAllWeeks && (
            <>
              <Button onClick={() => navigateWeeks("prev")}>
                Previous Week
              </Button>
              <Button onClick={() => navigateWeeks("next")}>Next Week</Button>
            </>
          )}
          <Button onClick={toggleShowAllWeeks}>
            {showAllWeeks ? "Show Current Week" : "Show All Weeks"}
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ background: "#6464b057" }}>
                <TableRow>
                  <TableCell>Friend</TableCell>
                  <TableCell align="right">Availability</TableCell>
                  <TableCell align="right">Action Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Example rows */}
                <TableRow
                  key="friend1"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    My friend
                  </TableCell>
                  <TableCell align="right">
                    {showAllWeeks ? (
                      matchingWeeks.map((week, index) => (
                        <div className="week_days">
                          <p key={index} className="available_weeks">
                            {week.week}:
                          </p>
                          <p>{formatDays(week.days)}</p>
                        </div>
                      ))
                    ) : (
                      <div className="week_days">
                        <p className="available_weeks">
                          {matchingWeeks[currentWeekIndex].week}:
                        </p>
                        <p>
                          {formatDays(matchingWeeks[currentWeekIndex].days)}
                        </p>
                      </div>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <Tooltip title="View Profile">
                      <IconButton style={{ color: "blue" }}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send Challenge">
                      <IconButton style={{ color: "green" }}>
                        <SendIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Message">
                      <IconButton style={{ color: "yellow" }}>
                        <EmailIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Chat">
                      <IconButton style={{ color: "green" }}>
                        <ChatIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton style={{ color: "red" }}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <p>No matching weeks found.</p>
      )}
    </div>
  );
};

export default AvailabilityMatcher;
