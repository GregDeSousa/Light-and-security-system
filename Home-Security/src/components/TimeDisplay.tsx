import React, { useEffect, useState } from "react";
import "./TimeDisplay.css"; // Ensure you have a CSS file for styling

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: any) =>
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const weekday = date.toLocaleString("en-GB", { weekday: "short" });
    const dayWithSuffix = getDayWithSuffix(day);

    return `${dayWithSuffix} ${month}, ${weekday}`;
  };

  const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return `${day}th`; // handle 11th–13th
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  return (
    <div className="time-container">
      <div className="time">{formatTime(currentTime)}</div>
      <div className="date">{formatDate(currentTime)}</div>
    </div>
  );
};

export default TimeDisplay;
