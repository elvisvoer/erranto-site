import * as React from "react";
import { Link, graphql } from "gatsby";
/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "../components/layout";
import Seo from "../components/seo";

const IndexPage = ({ data }: any) => {
  return (
    <Layout>
      {data.allMdx.nodes.map(
        (node: any) =>
          node.frontmatter.slug && (
            <article key={node.id}>
              <h2>
                <Link
                  to={`/blog/${node.frontmatter.slug}`}
                  sx={{
                    color: "inherit",
                    "&.active": {
                      color: "primary",
                    },
                  }}
                >
                  {node.frontmatter.title}
                </Link>
              </h2>
              <p>Posted: {node.frontmatter.date}</p>
            </article>
          )
      )}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
      }
    }
  }
`;

export const Head = () => <Seo title="Blog" />;

export default IndexPage;
