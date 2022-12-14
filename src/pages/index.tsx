import * as React from "react";
import { Link, graphql } from "gatsby";
/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Prompt from "../components/prompt";

const IndexPage = ({ data }: any) => {
  return (
    <Layout>
      <span>
        <Prompt />
        ls -l blog
      </span>
      {data.allMdx.nodes.map(
        (node: any) =>
          node.frontmatter.slug && (
            <article
              key={node.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
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
              </div>
              <div>Posted: {node.frontmatter.date}</div>
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
