import * as React from "react";
import { Link } from "gatsby";
/** @jsx jsx */
import { jsx } from "theme-ui";
import Logo from "./logo";
import Prompt from "./prompt";
import Footer from "./footer";
import { ThemeProvider, ThemeChanger } from "./theme";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
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

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default Layout;
