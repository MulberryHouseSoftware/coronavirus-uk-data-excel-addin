import * as React from "react";
import { Spinner, SpinnerType, Stack, Text } from "office-ui-fabric-react";
import icon from "../../../assets/icon.svg";
/* global Spinner */

export interface ProgressProps {
  message: string;
  title: string;
}

export class Progress extends React.Component<ProgressProps> {
  render() {
    const { message, title } = this.props;

    return (
      <section>
        <Stack horizontalAlign="center">
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
