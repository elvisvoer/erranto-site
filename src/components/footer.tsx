import React from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";

import Prompt from "./prompt";

export default () => (
  <footer>
    <div>
      <Prompt /> echo $NOTICE
    </div>
    <pre sx={{ fontSize: ["2.42vw", "1.12rem", "1.12rem"] }}>
      {`*****************************************************************
*                                                               *
*                       COPYRIGHT NOTICE                        *
*                                                               *
*   Copyright (C) 2022-2023 erranto.com. All rights reserved.   *
*                                                               *
*****************************************************************`}
    </pre>
  </footer>
);
