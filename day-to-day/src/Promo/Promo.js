import React from "react";
import Editor from "./editor";
import Markdown from "react-markdown";
import CodeBlock from "./code-block";
import axios from "axios";
import { debounce } from "lodash";

import "./Promo.css";

const initialSource = `
# Promo 2019

## Citizenship

## Software Engineering

## Design and Architecture

## Execution and Results

## Collaboration

## Creating Efficiency
`;

export default class Promo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.state = {
      markdownSrc: initialSource,
      htmlMode: "raw",
      email: this.props.email
    };
  }

  save = content => {
    this.setState({ markdownSrc: content });
    this.savePromoContent(content);
  };

  savePromoContent = debounce(content => {
    axios.post(
      "https://us-central1-daytoday-app.cloudfunctions.net/API/promo",
      {
        email: this.state.email,
        content: content
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }, 100);

  handleMarkdownChange(evt) {
    this.save(evt.target.value);
  }

  componentDidMount() {
    axios
      .get(
        "https://us-central1-daytoday-app.cloudfunctions.net/API/promo",
        {
          params: {
            email: this.state.email
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(res => {
        this.setState({ markdownSrc: res.data.content });
      });
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
