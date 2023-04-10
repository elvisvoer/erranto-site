import * as React from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";
import { ThemeProvider } from "../components/theme";
import Seo from "../components/seo";
import Prompt from "../components/prompt";

import {
  Terminal,
  TerminalLine,
  TerminalInput,
  TerminalPrompt,
} from "./tty.module.css";

const TtyPage = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState<string[]>([]);
  const inputElement = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputElement.current?.focus();
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setOutput((output) => [...output, input]);
      setInput("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <ThemeProvider>
      <div className={Terminal}>
        <div>
          {output.map((item, index) => (
            <div key={index} className={TerminalLine}>
              <Prompt className={TerminalPrompt} />
              {item}
            </div>
          ))}
          <div className={TerminalLine}>
            <Prompt className={TerminalPrompt} />
            <input
              ref={inputElement}
              className={TerminalInput}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              autoFocus={true}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export const Head = () => <Seo title="Terminal" />;

export default TtyPage;
