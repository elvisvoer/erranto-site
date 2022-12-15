import React from "react";

import Prompt from "./prompt";

export default () => (
  <footer>
    <div>
      <Prompt /> echo $COPYRIGHT
    </div>
    <pre>
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
