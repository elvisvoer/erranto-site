import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Erranto`,
    siteUrl: "https://erranto.com/",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 760,
              withWebp: { quality: 80 },
              showCaptions: true,
              wrapperStyle: "text-align: center; font-size: small; font-style: italic;"
            },
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `./blog`,
      },
      __key: "blog",
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }: any) => {
              return allMarkdownRemark.nodes.map((node: any) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  title: node.frontmatter.title,
                  date: node.frontmatter.created,
                  url: `${site.siteMetadata.siteUrl}/blog/${node.frontmatter.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/blog/${node.frontmatter.slug}`,
                  custom_elements: [{ "content:encoded": node.html }],
                  author: "Elvis Adomnica",
                  categories: node.frontmatter.tags,
                });
              });
            },
            query: `
              {
                allMarkdownRemark(sort: { frontmatter: { created: DESC } }) {
                  nodes {
                    excerpt
                    html
                    frontmatter {
                      slug
                      title
                      tags
                      created(formatString: "MMMM D, YYYY")
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Erranto RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
          },
        ],
      },
    },
  ],
};

export default config;
