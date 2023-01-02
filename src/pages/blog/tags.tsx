import React from "react";
import kebabCase from "lodash/kebabCase";
import { Link, graphql } from "gatsby";

import Seo from "../../components/seo";
import Layout from "../../components/layout";
import Prompt from "../../components/prompt";

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  },
}: any) => (
  <Layout>
    <div>
      <div>
      <Prompt /> grep -Ril "*" blog/
      </div>
      <h2>All tags</h2>
      <div>
        {group.map((tag: any) => (
          <div key={tag.fieldValue}>
            {"- "}
            <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export const Head = () => <Seo title="Blog - All tags" />;

export default TagsPage;
