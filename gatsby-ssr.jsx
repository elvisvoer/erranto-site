// Import React so that you can use JSX in HeadComponents
const React = require("react");

const HtmlAttributes = {
  lang: "en",
};

const HeadComponents = [
  <style key="custom-styles">{`
  html {
    font-size: 18px;
  }

  a {
    color: inherit;
  }

  hr {
    border: 0;
    height: 0;
    border-top: 1px dashed rgba(0, 0, 0, 0.5);
    border-bottom: 1px dashed rgba(255, 255, 255, 0.5);
  }

  code {
    /* not sure why code needs a fix for explicit font-size declared on html tag */
    font-size: 0.9rem;
    /* also apply color, now that we are at it */
    color: var(--theme-ui-colors-secondary);
  }
  `}</style>,
  <script
    key="umami-analytics"
    async
    defer
    src="https://analytics.umami.is/script.js"
    data-website-id="3e8f8c7e-de17-40c6-bc2e-5362a6cc6cf8"
    data-domains="erranto.com,errantositemain.gatsbyjs.io"
  ></script>,
];

exports.onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes(HtmlAttributes);
  setHeadComponents(HeadComponents);
};
