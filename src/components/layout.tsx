import * as React from "react";
import { Link } from "gatsby";
/** @jsx jsx */
import {
  jsx,
  ThemeProvider,
  useColorMode,
} from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import { tosh } from "@theme-ui/presets";
import Logo from "./logo";
import Prompt from "./prompt";
import Footer from "./footer";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

const themeLink = {
  textDecoration: "underline",
  cursor: "pointer",
};

const navLinks = {
  display: "flex",
  listStyle: "none",
  paddingLeft: 0,
  margin: 0,
};

const navLinkItem = {
  paddingRight: "2rem",
};

const ThemeChanger = () => {
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

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={tosh}>
      <Themed.root
        sx={{
          padding: 2,
          maxWidth: 810,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
        css={`
          a {
            color: inherit;
          }

          hr {
            border: 0;
            height: 0;
            border-top: 1px dashed rgba(0, 0, 0, 0.5);
            border-bottom: 1px dashed rgba(255, 255, 255, 0.5);
          }

          code {
            /* not sure why code needs a fix for explicit font-size declared on html tag */
            font-size: 0.8rem;
            /* also apply color, now that we are at it */
            color: var(--theme-ui-colors-accent);
          }
        `}
      >
        <div sx={{ marginBottom: 3 }}>
          <Logo />
          <ThemeChanger />
        </div>
        <nav sx={{ marginBottom: 3 }}>
          <span>
            <Prompt /> ls
          </span>
          <ul style={navLinks}>
            <li style={navLinkItem}>
              <Link to="/">blog</Link>
            </li>
            <li style={navLinkItem}>
              <Link to="/about">about.mdx</Link>
            </li>
            <li style={navLinkItem}>
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
