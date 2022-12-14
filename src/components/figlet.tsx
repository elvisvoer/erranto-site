import * as React from "react";
import figlet from "figlet";

import font from "figlet/importable-fonts/Banner3.js";

figlet.parseFont("Banner3", font);

function getText(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    figlet.text(
      text,
      {
        font: "Banner3",
      },
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result as string);
        }
      }
    );
  });
}

const Figlet = ({ text }: { text: string }) => {
  const [fig, setFig] = React.useState<string>("");

  React.useEffect(() => {
    getText(text).then(setFig);
  }, []);

  return <pre>{fig}</pre>;
};

export default Figlet;
