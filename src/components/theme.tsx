import * as React from "react";
import { Link } from "gatsby";
/** @jsx jsx */
import {
  jsx,
  ThemeProvider as TP,
  InitializeColorMode,
  useColorMode,
} from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import { tosh } from "@theme-ui/presets";

type ThemeProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

const themeLink = {
  textDecoration: "underline",
  cursor: "pointer",
};

export const ThemeChanger = () => {
  const [colorMode, setColorMode] = useColorMode();

  const setDarkMode = (isDark: boolean) =>
    setColorMode(isDark ? "dark" : "default");

  return (
    <>
      <div>
        Color mode: {colorMode && colorMode.replace("default", "light")}
      </div>
      <div>
        Available color modes:{" "}
        <span style={themeLink} onClick={() => setDarkMode(false)}>
          light
        </span>
        ,{" "}
        <span style={themeLink} onClick={() => setDarkMode(true)}>
          dark
        </span>
      </div>
    </>
  );
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <TP theme={tosh}>
      <Themed.root
        sx={{
          padding: 2,
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <InitializeColorMode />
        {children}
      </Themed.root>
    </TP>
  );
};
