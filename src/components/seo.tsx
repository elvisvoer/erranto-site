import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

type SeoProps = {
  title: string;
};

const Seo = ({ title }: SeoProps) => {
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
    <>
      <title>
        {title} | {data.site.siteMetadata.title}
      </title>
      <script
        async
        defer
        src="https://analytics.umami.is/script.js"
        data-website-id="3e8f8c7e-de17-40c6-bc2e-5362a6cc6cf8"
      ></script>
    </>
  );
};

export default Seo;
