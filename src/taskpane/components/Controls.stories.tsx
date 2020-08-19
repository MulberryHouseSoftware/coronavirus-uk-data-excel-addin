import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Controls, ControlsProps } from "./Controls";

export default {
  title: "Example/Controls",
  component: Controls
} as Meta;

const Template: Story<ControlsProps> = args => <Controls {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  areaType: { key: "nation", text: "Nation" },
  areaName: { key: "England", text: "England" },
  metrics: []
};
