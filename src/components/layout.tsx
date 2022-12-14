import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import { deep } from "@theme-ui/presets";
import Figlet from "./figlet";

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
    <ThemeProvider theme={deep}>
      <Themed.root sx={{ bg: "background", color: "text", p: 3 }}>
        <div>
          <Figlet text={data.site.siteMetadata.title} />
          <nav>
            <ul>
              <li>
                <Link
                  to="/"
                  sx={{
                    color: "inherit",
                    "&.active": {
                      color: "primary",
                    },
                  }}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
          <main>{children}</main>
        </div>{" "}
      </Themed.root>
    </ThemeProvider>
  );
};

export default Layout;
