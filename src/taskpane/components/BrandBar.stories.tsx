import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { BrandBar } from "./BrandBar";

export default {
  title: "Example/BrandBar",
  component: BrandBar
} as Meta;

const Template: Story = args => <BrandBar {...args} />;

export const Primary = Template.bind({});
