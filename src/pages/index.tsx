import * as React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
import BlogPage from "../components/blog";

const IndexPage = ({ data }: any) => {
  return <BlogPage data={data} />;
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

export const Head = () => <Seo title="Blog" />;

export default IndexPage;
