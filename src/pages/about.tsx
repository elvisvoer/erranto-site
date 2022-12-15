import * as React from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Elvis from "../components/elvis";
import Prompt from "../components/prompt";

const AboutPage = () => {
  return (
    <Layout>
      <div>
        <Prompt />
        cat about.mdx | mdx-viewer
      </div>
      <h2>About me</h2>
      <div>Welcome to my little universe!</div>
      <Elvis />
    </Layout>
  );
};

export const Head = () => <Seo title="About" />;

export default AboutPage;
