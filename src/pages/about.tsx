import * as React from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";
import Layout from "../components/layout";
import Seo from "../components/seo";

const AboutPage = () => {
  return (
    <Layout>
      <div>This is a simple about page.</div>
    </Layout>
  );
};

export const Head = () => <Seo title="About" />;

export default AboutPage;
