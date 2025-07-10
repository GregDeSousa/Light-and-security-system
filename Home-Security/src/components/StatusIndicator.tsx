import "./StatusIndicator.css";
import ToggleSwitch from "./ToggleSwitch";
import React, { useState } from "react";

interface StatusIndicatorProps {
  status: string;
  active: boolean;
}

function StatusIndicator(StatusIndicatorProps: StatusIndicatorProps) {
  const dynamicStyles: React.CSSProperties = {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "218px",
    height: "34px",
    borderRadius: "50px",
    backgroundColor: StatusIndicatorProps.active ? "#22C55E" : "#EF4444",
  };

  return (
    <div className="StatusIndicator" style={dynamicStyles}>
      <p style={{ margin: 0, width: "100%" }}>{StatusIndicatorProps.status}</p>
    </div>
  );
}

export default StatusIndicator;
