import * as React from "react";
import { Spinner, SpinnerType, Stack, IStackTokens, Text } from "office-ui-fabric-react";
import icon from "../../../assets/icon.svg";
/* global Spinner */

export interface ProgressProps {
  message: string;
  title: string;
}

const stackTokens: IStackTokens = {
  childrenGap: `5 0`,
  padding: `12px 12px 12px 12px`
};

export class Progress extends React.Component<ProgressProps> {
  render() {
    const { message, title } = this.props;

    return (
      <section>
        <Stack horizontalAlign="center" tokens={stackTokens}>
          <img width="90" height="90" src={icon} alt={title} title={title} />
          <Text variant="xLarge" as="h1">
            {title}
          </Text>
          <Spinner type={SpinnerType.large} label={message} />
        </Stack>
      </section>
    );
  }
}
