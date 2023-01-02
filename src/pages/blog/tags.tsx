import React from "react";
import kebabCase from "lodash/kebabCase";
import { Link, graphql } from "gatsby";

const TagsPage = ({
  data: {
    allMdx: { group },
  },
}: any) => (
  <div>
    <div>
      <h1>Tags</h1>
      <ul>
        {group.map((tag: any) => (
          <li key={tag.fieldValue}>
            <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default TagsPage;

export const pageQuery = graphql`
  query {
    allMdx(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;
