import { Handle } from "@xyflow/react"; // Import Handle from ReactFlow
import React, { useState } from "react";

// Custom Node component
const CustomNode = ({ data, isHorizontal }) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: isHorizontal ? "column" : "row",
        alignItems: "center",
        cursor: "pointer", // Optional: change cursor on hover
      }}
      onMouseEnter={() => setIsHovered(true)} // Set hover state on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            // width: 60,
            // height: 60,
            width: 85,
            height: 85,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={data.icon}
            alt={data.label}
            style={{
              width: "100%",
              height: "100%",
              transition: "filter 0.3s ease", // Smooth transition for hover
              filter: isHovered
                ? `drop-shadow(0px 0px 8px ${data.color})`
                : "drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))", // Conditional shadow
            }}
          />

          {/* + Button, visible only on hover */}
          {isHovered && (
            <button
            type="button"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                // bottom: isHorizontal ? 25 : -10,
                // right: isHorizontal ? -15 : 20,
                bottom: isHorizontal ? 34 : -12,
                right: isHorizontal ? -20 : 28,
                rotate: isHorizontal ? "270deg" : 0,

                //  top: '50%', // Center vertically
                //  left: '50%', // Center horizontally
                //  transform: 'translate(-50%, -50%)', // Center adjustment
                fontSize: 12,
                background: data.color,
                color: "white",
                border: "none",
                borderRadius: "0 0 150px 150px",
                // width: 20, // Increased size to make semi-circle more visible
                // height: 10, // Same as width for semi-circle
                width: 30, // Increased size to make semi-circle more visible
                height: 15, // Same as width for semi-circle
                cursor: "pointer",
                boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.2)", // Shadow for button
              }}
              onClick={() => alert("New node will be added when clicked.")}
            >
              +
            </button>
          )}
        </div>

        {/* Source Handle */}
        <Handle
          type="source"
          position={isHorizontal ? "right" : "bottom"}
          style={{
            background: "transparent",
            top: isHorizontal ? "50%" : "90%",
            left: isHorizontal ? "90%" : "50%",
            transform: isHorizontal ? "translateY(-50%)" : "translateX(-50%)",
            border: "none",
          }}
        />

        {/* Target Handle */}
        <Handle
          type="target"
          position={isHorizontal ? "left" : "top"}
          style={{
            background: "transparent",
            top: isHorizontal ? "50%" : 0,
            left: isHorizontal ? 0 : "50%",
            transform: isHorizontal ? "translateY(-50%)" : "translateX(-50%)",
            border: "none",
          }}
        />
      </div>

      {/* Wrapper for Label and Subtext with relative positioning */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: isHorizontal ? "center" : "flex-start",
          marginLeft: isHorizontal ? 0 : 10,
          bottom: isHorizontal ? 0 : 22,
        }}
      >
        {/* Label and Subtext with absolute positioning */}
        <div
          style={{
            position: "absolute",
            padding: "5px",
            textWrap: "nowrap",
            textAlign: isHorizontal ? "center" : "left",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontFamily: "Public Sans",
              fontSize: 16,
              color: "#1C252E",
            }}
          >
            {data.label}
          </div>
          <div
            style={{
              fontFamily: "Public Sans",
              fontSize: 10,
              color: "#556370",
            }}
          >
            {data.subtext}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNode;
