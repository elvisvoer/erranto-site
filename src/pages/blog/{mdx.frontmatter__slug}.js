import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Prompt from "../../components/prompt";

const BlogPost = ({ data, children }) => {
  return (
    <Layout>
      <div>
        <Prompt />
        cat blog/{data.mdx.frontmatter.slug}.mdx | mdx-viewer
      </div>
      <h2>{data.mdx.frontmatter.title}</h2>
      <p>Posted: {data.mdx.parent.birthTime}</p>
      {children}
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        slug
      }
      parent {
        id
        ... on File {
          size
          birthTime(formatString: "MMMM D, YYYY")
        }
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;

export default BlogPost;
