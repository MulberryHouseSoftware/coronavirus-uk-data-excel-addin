import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { App, AppProps } from "./App";

export default {
  title: "Example/App",
  component: App
} as Meta;

const Template: Story<AppProps> = args => <App {...args} />;

export const OfficeInitialized = Template.bind({});
OfficeInitialized.args = {
  isOfficeInitialized: true
};

export const OfficeNotInitialized = Template.bind({});
OfficeNotInitialized.args = {
  isOfficeInitialized: false
};
