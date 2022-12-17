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
        data-website-id="60ea6765-9fa9-4164-a429-a494c59e871d"
        src="https://umami-production-b848.up.railway.app/umami.js"
      ></script>
    </>
  );
};

export default Seo;
