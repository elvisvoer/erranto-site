import * as React from "react";
import { Link } from "gatsby";
/** @jsx jsx */
import { jsx, ThemeProvider, InitializeColorMode } from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import { tosh } from "@theme-ui/presets";
import Logo from "./logo";
import Prompt from "./prompt";
import Footer from "./footer";

import { navLinks, navLinkItem } from "./layout.module.css";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={tosh}>
      <InitializeColorMode />
      <Themed.root
        sx={{
          bg: "background",
          color: "text",
          padding: 2,
          maxWidth: 640,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Logo />
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
