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

const BlogPost = ({ data, children, ...rest }) => {
  console.log({ data, children, rest });

  return (
    <Layout>
      <div>
        <Prompt /> cat blog/{data.mdx.frontmatter.slug}.mdx | mdx-viewer
      </div>
      <h1>{data.mdx.frontmatter.title}</h1>
      <div>
        <div>Posted: {data.mdx.frontmatter.date}</div>
        <div>
          Tags:{" "}
          {data.mdx.frontmatter.tags.map((t, i, a) => (
            <span key={t}>
              <Link to={`/blog/tags/${kebabCase(t)}`}>{t}</Link>
              {i < a.length - 1 && ", "}
            </span>
          ))}
        </div>
      </div>
      {children}
      <hr style={{ color: "inherit" }} />
      <CommentsSection />
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
        tags
      }
      body
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;

export default BlogPost;
