import "office-ui-fabric-react/dist/css/fabric.min.css";
import { App } from "./components/App";
import { AppContainer } from "react-hot-loader";
import { insertRange } from "../lib/insertRange";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import * as React from "react";
import * as ReactDOM from "react-dom";
/* global AppCpntainer, Component, document, Office, module, require */

initializeIcons();

let isOfficeInitialized = false;

const title = "Coronavirus UK Data";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component title={title} isOfficeInitialized={isOfficeInitialized} onInsertRange={insertRange} />
    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.initialize = () => {
  isOfficeInitialized = true;
  render(App);
};

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
