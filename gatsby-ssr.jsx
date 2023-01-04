// Import React so that you can use JSX in HeadComponents
const React = require("react");

const HtmlAttributes = {
  lang: "en",
};

const HeadComponents = [];

const BodyAttributes = {
  "data-theme": "dark",
};

exports.onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes,
}) => {
  setHtmlAttributes(HtmlAttributes);
  setHeadComponents(HeadComponents);
  setBodyAttributes(BodyAttributes);
};
