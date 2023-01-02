import React from "react";
import { Link, graphql } from "gatsby";

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
          frontmatter {
            title
            slug
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

  return (
    <Layout>
      <div>
        <Prompt /> grep -rnw blog/ -e '{tag}' (
        <Link to="/blog/tags">view all</Link>)
      </div>
      <h2>{tagHeader}</h2>
      <div>
        {edges.map(({ node }) => {
          const { title, slug } = node.frontmatter;
          return (
            <div key={slug}>
              - <Link to={`/blog/${slug}`}>{title}</Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Tags;
