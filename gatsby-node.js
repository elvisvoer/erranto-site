const path = require("path");
const _ = require("lodash");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve("src/templates/blog.js");
  const tagTemplate = path.resolve("src/templates/tags.js");

  const result = await graphql(`
    {
      posts: allMarkdownRemark(sort: { frontmatter: { created: DESC } }, limit: 2000) {
        edges {
          node {
            id
            frontmatter {
              tags
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
      tags: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const posts = result.data.posts.edges;

  // Create post detail pages
  posts.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.frontmatter.slug}/`,
      component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    });
  });

  // Extract tag data from query
  const tags = result.data.tags.group;

  // Make tag pages
  tags.forEach((tag) => {
    createPage({
      path: `/blog/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};
