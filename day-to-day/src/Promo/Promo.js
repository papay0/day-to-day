import React from "react";
import Editor from "./editor";
import Markdown from "react-markdown";
import CodeBlock from "./code-block";

import "./Promo.css";

const initialSource = `
# Promo 2019

## Software Engineering

- [x]  Cmd+C
- [ ]  Cmd+V

## Design & Architecture

- [x]  Design Uber under 1 hour
- [ ]  What is MVC?
`;

export default class Promo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.state = {
      markdownSrc: initialSource,
      htmlMode: "raw"
    };
  }

  handleMarkdownChange(evt) {
    this.setState({ markdownSrc: evt.target.value });
  }

  handleControlsChange(mode) {
    this.setState({ htmlMode: mode });
  }

  render() {
    return (
      <div className="promo">
        <div className="editor-pane">
          <Editor
            value={this.state.markdownSrc}
            onChange={this.handleMarkdownChange}
          />
        </div>
        <div className="result-pane">
          <Markdown
            className="result"
            source={this.state.markdownSrc}
            skipHtml={this.state.htmlMode === "skip"}
            escapeHtml={this.state.htmlMode === "escape"}
            renderers={{ code: CodeBlock }}
          />
        </div>
      </div>
    );
  }
}
