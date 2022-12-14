import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import { deep } from "@theme-ui/presets";
import Figlet from "./figlet";
import Prompt from "./prompt";

import { navLinks, navLinkItem } from "./layout.module.css";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div>
      <ThemeProvider theme={deep}>
        <Themed.root
          sx={{ bg: "background", color: "text", marginLeft: 3, maxWidth: 640 }}
        >
          <Figlet text={data.site.siteMetadata.title} />
          <nav sx={{ marginBottom: 3 }}>
            <span>
              <Prompt /> ls
            </span>
            <ul className={navLinks}>
              <li className={navLinkItem}>
                <Link
                  to="/"
                  sx={{
                    color: "inherit",
                    "&.active": {
                      color: "primary",
                    },
                  }}
                >
                  blog
                </Link>
              </li>
              <li className={navLinkItem}>
                <Link
                  to="/about"
                  sx={{
                    color: "inherit",
                    "&.active": {
                      color: "primary",
                    },
                  }}
                >
                  about.mdx
                </Link>
              </li>
            </ul>
          </nav>
          <main>{children}</main>
        </Themed.root>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
