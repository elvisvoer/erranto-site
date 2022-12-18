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
      <h1>{data.mdx.frontmatter.title}</h1>
      <p>Posted: {data.mdx.frontmatter.date}</p>
      {children}
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        slug
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;

export default BlogPost;
