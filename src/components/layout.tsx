import * as React from "react";
import { Link } from "gatsby";
/** @jsx jsx */
import {
  jsx,
  ThemeProvider,
  InitializeColorMode,
  useColorMode,
} from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import { tosh } from "@theme-ui/presets";
import Logo from "./logo";
import Prompt from "./prompt";
import Footer from "./footer";

import { navLinks, navLinkItem } from "./layout.module.css";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

const themeLink = {
  textDecoration: "underline",
  cursor: "pointer",
};

const ThemeChanger = () => {
  const [colorMode, setColorMode] = useColorMode();

  const setDarkMode = (isDark: boolean) =>
    setColorMode(isDark ? "dark" : "default");

  return (
    <>
      <div>Color mode: {colorMode !== "dark" ? "light" : "dark"}</div>
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

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={tosh}>
      <Themed.root
        sx={{
          padding: 2,
          maxWidth: 640,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div sx={{ marginBottom: 3 }}>
          <InitializeColorMode />
          <Logo />
          <ThemeChanger />
        </div>
        <nav sx={{ marginBottom: 3 }}>
          <span>
            <Prompt /> ls
          </span>
          <ul className={navLinks}>
            <li className={navLinkItem}>
              <Link to="/">blog</Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/about">about.mdx</Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/rss.xml">rss.xml</Link>
            </li>
          </ul>
        </nav>
        <main sx={{ flex: 1 }}>{children}</main>
        <Footer />
      </Themed.root>
    </ThemeProvider>
  );
};

export default Layout;
