import React from "react";

import { Box, IconButton } from "@mui/material";
import { Google, Twitter, Facebook, LinkedIn, Instagram } from "@mui/material/Icon";

const SocialIcons = () => {
  // Inline styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      position: "relative",
    },
    list: {
      position: "relative",
      display: "flex",
      width: "404px",
      height: "60px",
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    listBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(45deg, #ff00ff, #8a2be2)",
      borderRadius: "30px",
      transition: "0.5s",
      zIndex: 1,
    },
    listBackgroundHover: {
      width: "60px",
    },
    iconButton: {
      display: "block",
      width: "60px",
      height: "60px",
      backgroundColor: "#262626",
      color: "#fff",
      borderRadius: "50%",
      transition: "0.5s",
      fontSize: "30px",
      zIndex: 2,
    },
    hoverEffects: (index) => ({
      transform: `translateX(${68 * index}px) rotate(360deg)`,
      transitionDelay: `${0.8 - index * 0.2}s`,
    }),
    colors: [
      "#3b5999", // Facebook
      "#55acee", // Twitter
      "#dd4b39", // Google
      "#0077B5", // LinkedIn
      "#e4405f", // Instagram
    ],
  };

  const [hover, setHover] = React.useState(false);

  const icons = [
    <Facebook />,
    <Twitter />,
    <Google />,
    <LinkedIn />,
    <Instagram />,
  ];

  return (
    <Box
      sx={styles.container}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box sx={styles.list}>
        <Box
          sx={{
            ...styles.listBackground,
            ...(hover ? styles.listBackgroundHover : {}),
          }}
        />
        {icons.map((icon, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              transition: "1s",
              ...(hover ? styles.hoverEffects(index) : {}),
            }}
          >
            <IconButton
              href=""
              sx={{
                ...styles.iconButton,
                backgroundColor: styles.colors[index],
              }}
            >
              {icon}
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SocialIcons;
