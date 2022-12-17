import * as React from "react";
import { Link, graphql } from "gatsby";
/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Prompt from "../components/prompt";

const IndexPage = ({ data }: any) => {
  const totalSize = data.allMdx.nodes.reduce((acc: number, node: any) => {
    return acc + node.parent.size;
  }, 0);

  return (
    <Layout>
      <div>
        <Prompt />
        ls -l blog/
      </div>
      <div>total {totalSize}</div>
      <table sx={{ width: "100%" }}>
        {data.allMdx.nodes
          .filter((n: any) => n)
          .map(
            (node: any) =>
              node.frontmatter.slug && (
                <tr key={node.id}>
                  <td>-rw-rw-r-- 1 elvis elvis</td>
                  <td>{node.parent.size}</td>
                  <td>{node.frontmatter.date}</td>
                  <td>
                    <Link
                      to={`/blog/${node.frontmatter.slug}`}
                      sx={{
                        color: "inherit",
                        "&.active": {
                          color: "primary",
                        },
                      }}
                    >
                      {node.frontmatter.slug}.mdx
                    </Link>
                  </td>
                </tr>
              )
          )}
      </table>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
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
`;

export const Head = () => <Seo title="Erranto" />;

export default IndexPage;
