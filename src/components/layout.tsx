import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import { deep } from "@theme-ui/presets";

type LayoutProps = {
  pageTitle: string;
  children: React.ReactNode | React.ReactNode[];
};

const Layout = ({ pageTitle, children }: LayoutProps) => {
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
          <header>{data.site.siteMetadata.title}</header>
          <nav>
            <ul>
              <li>
                <Link to="/">Blog</Link>
              </li>
            </ul>
          </nav>
          <main>
            <h1>{pageTitle}</h1>
            {children}
          </main>
        </div>{" "}
      </Themed.root>
    </ThemeProvider>
  );
};

export default Layout;
