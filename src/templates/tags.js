import { Link, graphql } from "gatsby";
/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Prompt from "../components/prompt";

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { created: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            slug
            created(formatString: "MMMM D, YYYY")
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

const pluralize = (word, count) => {
  if (count > 1) {
    return `${word}s`;
  }

  return word;
};

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;

  const totalSize = data.allMarkdownRemark.edges
    .map(({ node }) => node)
    .reduce((acc, node) => {
      return acc + node.parent.size;
    }, 0);

  return (
    <Layout>
      <div>
        <Prompt /> grep -Ril "{tag}" blog/ #{" "}
        <Link to="/blog/tags" style={{ display: "inline-block" }}>
          view all tags
        </Link>
      </div>
      <h2>
        {totalCount} {pluralize("post", totalCount)} tagged with {tag}
      </h2>
      <div>Total size: {totalSize} bytes</div>
      <table sx={{ width: "100%" }}>
        <tbody>
          {edges.map(
            ({ node }) =>
              node.frontmatter.slug && (
                <tr key={node.id}>
                  <td>elvis</td>
                  <td>{node.parent.size}</td>
                  <td>{node.frontmatter.created}</td>
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
