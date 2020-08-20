import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { App, AppProps } from "./App";

export default {
  title: "Example/App",
  component: App
} as Meta;

const Template: Story<AppProps> = args => (
  <div style={{ width: "350px", height: "378px", border: "1px solid black" }}>
    <App {...args} />
  </div>
);

export const OfficeInitialized = Template.bind({});
OfficeInitialized.args = {
  isOfficeInitialized: true,
  title: "Coronavirus UK Data"
};

export const OfficeNotInitialized = Template.bind({});
OfficeNotInitialized.args = {
  isOfficeInitialized: false,
  title: "Coronavirus UK Data"
};
