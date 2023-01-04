// Import React so that you can use JSX in HeadComponents
const React = require("react");

const HtmlAttributes = {
  lang: "en",
};

const HeadComponents = [
  <style key="custom-styles">{`
  html {
    font-size: 17px;
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
    font-size: 0.8rem;
    /* also apply color, now that we are at it */
    color: var(--theme-ui-colors-accent);
  }
  `}</style>,
];

exports.onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
}) => {
  setHtmlAttributes(HtmlAttributes);
  setHeadComponents(HeadComponents);
};
