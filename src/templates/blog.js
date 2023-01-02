import * as React from "react";
import { Link, graphql } from "gatsby";
import kebabCase from "lodash/kebabCase";
import Utterances from "utterances-react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Prompt from "../components/prompt";

const CommentsSection = () => {
  return (
    <Utterances
      repo="elvisvoer/erranto-comments"
      issue-term="pathname"
      theme="preferred-color-scheme"
      crossorigin="anonymous"
      async={false}
    />
  );
};

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        slug
        tags
      }
    }
  }
`;

const BlogPost = ({ data }) => {
  return (
    <Layout>
      <div>
        <Prompt /> cat blog/{data.markdownRemark.frontmatter.slug}.mdx |
        mdx-viewer
      </div>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <div>
        <div>Posted: {data.markdownRemark.frontmatter.date}</div>
        {data.markdownRemark.frontmatter.tags && (
          <div>
            Tags:{" "}
            {data.markdownRemark.frontmatter.tags.map((t, i, a) => (
              <span key={t}>
                <Link to={`/blog/tags/${kebabCase(t)}`}>{t}</Link>
                {i < a.length - 1 && ", "}
              </span>
            ))}
          </div>
        )}
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <hr />
      <CommentsSection />
    </Layout>
  );
};

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
);

export default BlogPost;
