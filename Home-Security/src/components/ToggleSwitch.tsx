import "./ToggleSwitch.css";
import React, { useState } from "react";

interface ToggleSwitchProps {
  checkedVal: boolean;
  Toggled?: (checked: boolean) => void;
}

function ToggleSwitch(ToggleSwitchProps: ToggleSwitchProps) {
  const ToggledSwitch = () => {
    ToggleSwitchProps.Toggled?.(!ToggleSwitchProps.checkedVal);
    //console.log("ToggleSwitch: ", ToggleSwitchProps.checkedVal);
  };

  return (
    <div className="ToggleSwitch">
      <form name="toggleLights">
        <label className="switch">
          <input
            className="checkboxS"
            type="checkbox"
            name="checkbox_1"
            id="LightSwitch"
            value="1"
            onChange={ToggledSwitch}
            checked={ToggleSwitchProps.checkedVal}
          ></input>
          <span className="slider"></span>
        </label>
      </form>
    </div>
  );
}

export default ToggleSwitch;
