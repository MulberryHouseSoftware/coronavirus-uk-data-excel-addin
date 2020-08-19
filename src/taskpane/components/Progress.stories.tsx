import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Progress, ProgressProps } from "./Progress";

export default {
  title: "Example/Progress",
  component: Progress
} as Meta;

const Template: Story<ProgressProps> = args => <Progress {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  logo: "assets/logo-filled.png",
  message: "Please sideload your addin to see app body.",
  title: "Coronavirus UK Data"
};
