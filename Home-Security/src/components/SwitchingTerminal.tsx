import "./SwitchingTerminal.css";
import ToggleSwitch from "./ToggleSwitch";
import React, { useEffect, useState } from "react";

function SwitchingTerminal() {
  const [lightsOn, setLightsOn] = useState(false);
  const [smartLighting, setSmartLighting] = useState(false);
  const [alarmSystem, setAlarmSystem] = useState(false);

  useEffect(() => {
    // Simulate fetching initial states from a server or local storage
    const fetchInitialStates = async () => {
      // Here you would typically fetch the initial states from an API or local storage
      try {
        const response = await fetch("http://10.0.0.133:5000/toggle-light", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        setLightsOn(data.LightsON ? true : false);
      } catch (error) {
        console.error("Error:", error);
        alert("Unable to fetch light status");
      }

      try {
        const response = await fetch("http://10.0.0.133:5000/auto-light", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        setSmartLighting(data.EntryLighting ? true : false);
      } catch (error) {
        console.error("Error:", error);
        alert("Unable to fetch auto light status");
      }

      try {
        const response = await fetch("http://10.0.0.133:5000/alarm-set", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        setAlarmSystem(data.AlarmArmed ? true : false);
      } catch (error) {
        console.error("Error:", error);
        alert("Unable to fetch alarm status");
      }
    };

    fetchInitialStates();
  }, []);

  const ToggleLights = (checked: boolean) => {
    fetch("http://10.0.0.133:5000/toggle-light", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkbox_1: checked }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLightsOn(checked);
        console.log(data.status);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("It broke!");
      });
  };

  const ToggleSmartLighting = (checked: boolean) => {
    fetch("http://10.0.0.133:5000/auto-light", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkbox_2: checked }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSmartLighting(checked);
        console.log(data.status);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("It broke!");
      });
  };
  const ToggleAlarmSystem = (checked: boolean) => {
    fetch("http://10.0.0.133:5000/alarm-set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkbox_3: checked }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
        setAlarmSystem(checked);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Cannot arm when door is open!");
      });
  };

  return (
    <div className="SwitchingTerminal">
      <div className="ButtonRow">
        <ToggleSwitch checkedVal={lightsOn} Toggled={ToggleLights} />
        <p>Toggle Lights</p>
      </div>
      <div className="ButtonRow">
        <ToggleSwitch
          checkedVal={smartLighting}
          Toggled={ToggleSmartLighting}
        />
        <p>Smart Lighting</p>
      </div>
      <div className="ButtonRow">
        <ToggleSwitch checkedVal={alarmSystem} Toggled={ToggleAlarmSystem} />
        <p>Alarm System</p>
      </div>
    </div>
  );
}

export default SwitchingTerminal;
