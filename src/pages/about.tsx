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
        <Prompt /> cat about.mdx | mdx-viewer
      </div>
      <h1>About me</h1>
      <div>Welcome to my little universe!</div>
      <Elvis />
    </Layout>
  );
};

export const Head = () => <Seo title="About" />;

export default AboutPage;
