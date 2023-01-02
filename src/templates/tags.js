import React from "react";
import { Link, graphql } from "gatsby";
/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Prompt from "../components/prompt";

export const pageQuery = graphql`
  query ($tag: String) {
    allMdx(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            slug
            date(formatString: "MMMM D, YYYY")
          }
          parent {
            id
            ... on File {
              size
            }
          }
        }
      }
    }
  }
`;

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  const totalSize = data.allMdx.edges
    .map(({ node }) => node)
    .reduce((acc, node) => {
      return acc + node.parent.size;
    }, 0);

  return (
    <Layout>
      <div>
        <Prompt /> grep -rnw blog/ -e '{tag}' (
        <Link to="/blog/tags">view all</Link>)
      </div>
      <h2>{tagHeader}</h2>
      <div>Total size: {totalSize} bytes</div>
      <table sx={{ width: "100%" }}>
        <tbody>
          {edges.map(
            ({ node }) =>
              node.frontmatter.slug && (
                <tr key={node.id}>
                  <td>elvis</td>
                  <td>{node.parent.size}</td>
                  <td>{node.frontmatter.date}</td>
                  <td>
                    <Link to={`/blog/${node.frontmatter.slug}`}>
                      {node.frontmatter.slug}.mdx
                    </Link>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default Tags;

export const Head = ({ pageContext }) => (
  <Seo title={`Blog - ${pageContext.tag}`} />
);
