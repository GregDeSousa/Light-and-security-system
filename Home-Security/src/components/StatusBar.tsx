import "./StatusBar.css";
import StatusIndicator from "./StatusIndicator";
import React, { useEffect, useState } from "react";
import io from "socket.io-client"; // Make sure you have this installed!

function StatusBar() {
  const [isArmed, setIsArmed] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    // 1. Fetch initial state
    const fetchInitialStates = async () => {
      try {
        const response = await fetch("http://10.0.0.133:5000/door-status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setDoorOpen(data.DoorOpened === true);
      } catch (error) {
        console.error("Error fetching door status:", error);
      }

      try {
        const response = await fetch("http://10.0.0.133:5000/alarm-set", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setIsArmed(data.AlarmArmed === true);
      } catch (error) {
        console.error("Error fetching door status:", error);
      }
    };

    fetchInitialStates();

    // 2. Setup socket connection
    const socket = io("http://10.0.0.133:5000");

    socket.on("connect", () => {
      console.log("Connected to Flask-SocketIO server");
    });

    // 3. Listen for door status updates
    socket.on("door_status", (data: any) => {
      if (data?.status === true) {
        setDoorOpen(true);
      } else {
        setDoorOpen(false);
      }
    });

    socket.on("alarm_status", (data: any) => {
      if (data?.status_a === true) {
        setIsArmed(true);
      } else {
        setIsArmed(false);
      }
    });

    // 2. Setup socket connection
    // const socket_alarm = io("http://10.0.0.101:5000");

    // socket_alarm.on("connect", () => {
    //   console.log("Connected to Flask-SocketIO server");
    // });

    // // 3. Listen for door status updates
    // socket_alarm.on("door_status", (data: any) => {
    //   if (data?.status === true) {
    //     setDoorOpen(true);
    //   } else {
    //     setDoorOpen(false);
    //   }
    //});

    // 4. Optional: cleanup socket on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="StatusBar">
      <div className="StatusIndicator-title">
        <p>Alarm Status</p>
        <StatusIndicator
          status={isArmed ? "Armed" : "Disarmed"}
          active={isArmed}
        />
      </div>
      <div className="StatusIndicator-title">
        <p>Door Status</p>
        <StatusIndicator
          status={doorOpen ? "Open" : "Closed"}
          active={doorOpen}
        />
      </div>
    </div>
  );
}

export default StatusBar;
