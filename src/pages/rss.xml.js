import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import pkg from "../../package.json" assert { type: "json" };
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = (await getCollection("blog"))
    .filter((post) => !post.data.archived)
    .sort((a, b) => new Date(b.data.created) - new Date(a.data.created));

  return rss({
    trailingSlash: false,
    title: "Erranto RSS Feed",
    description: pkg.description,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.created,
      link: `/blog/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body)),
      author: pkg.author,
      categories: post.data.tags,
    })),
  });
}
