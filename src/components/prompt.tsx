import React from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";

export default ({ className }: { className?: string }) => (
  <span className={className}>
    <span sx={{ color: "gray" }}>ea@erranto.com</span>{" "}
    <span sx={{ color: "secondary" }}>~</span>$
  </span>
);
