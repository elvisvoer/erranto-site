import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
/** @jsx jsx */
import { jsx } from "theme-ui";
import Seo from "../../components/seo";
import Layout from "../../components/layout";
import Prompt from "../../components/prompt";

export const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          frontmatter {
            slug
            date(formatString: "MMMM D, YYYY")
          }
          id
          parent {
            id
            ... on File {
              size
            }
          }
        }
      }
    }
  `);

  const totalSize = data.allMarkdownRemark.nodes.reduce((acc: number, node: any) => {
    return acc + node.parent.size;
  }, 0);

  return (
    <Layout>
      <div>
        <Prompt /> ls -l blog/
      </div>
      <h2>Recent Posts</h2>
      <div>Total size: {totalSize} bytes</div>
      <table sx={{ width: "100%" }}>
        <tbody>
          {data.allMarkdownRemark.nodes
            .filter((n: any) => n)
            .map(
              (node: any) =>
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

export const Head = () => <Seo title="Blog" />;

export default IndexPage;
