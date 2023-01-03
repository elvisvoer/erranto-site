import React from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";

import Prompt from "./prompt";

export default () => (
  <footer>
    <div>
      <Prompt /> echo $COPYRIGHT
    </div>
    <pre sx={{ fontSize: ["2.15vw", ".7rem", ".95rem"] }}>
      {`*************************************************************************
*                                                                       *
*                           COPYRIGHT NOTICE                            *
*                                                                       *
*  Copyright (C) 2022-2023 Elvis-Eduard Adomnică. All rights reserved.  *
*                                                                       *
*************************************************************************`}
    </pre>
  </footer>
);
