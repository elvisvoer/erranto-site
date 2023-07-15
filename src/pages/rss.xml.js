import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function get(context) {
  const blog = await getCollection("blog");

  console.log(blog);

  return rss({
    title: "Erranto RSS Feed",
    description: "Erranto Blog RSS Feed",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.created,
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
      author: "Elvis Adomnica",
    })),
  });
}
