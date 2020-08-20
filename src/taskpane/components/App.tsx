import * as React from "react";
import {
  IDropdownOption,
  Stack,
  MessageBar,
  MessageBarType,
  IStackStyles,
  IStackTokens,
  Link,
  Text
} from "office-ui-fabric-react";
import { Progress } from "./Progress";
import { BrandBar } from "./BrandBar";
import { Controls } from "./Controls";

const stackStyles: IStackStyles = {
  root: {
    height: "100%"
  }
};

const stackTokens: IStackTokens = {
  childrenGap: 12,
  padding: `4px 12px 12px 12px`
};

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
  onInsertRange: (areaType: string | number, areaName: string, metrics: string[]) => void;
}

export function App({ title, isOfficeInitialized, onInsertRange }: AppProps) {
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error>(null);
  const [areaType, setAreaType] = React.useState<IDropdownOption>({ key: "nation", text: "Nation" });
  const [areaName, setAreaName] = React.useState<object>({
    nation: { key: "England", text: "England" },
    region: { key: "North East", text: "North East" },
    nhsRegion: { key: "London", text: "London" }
  });
  const [metrics, setMetrics] = React.useState<string[]>(["date", "newCasesByPublishDate"]);

  const onChangeAreaType = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setAreaType(item);
  };

  const onChangeAreaName = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setAreaName({ ...areaName, [areaType.key]: item });
  };

  const onChangeMetrics = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    if (item) {
      setMetrics(item.selected ? [...metrics, item.key as string] : metrics.filter(key => key !== item.key));
    }
  };

  if (!isOfficeInitialized) {
    return <Progress title={title} message="Please sideload your addin to see app body." />;
  }

  const handleInsertRange = async () => {
    try {
      onInsertRange(areaType.key, areaName[areaType.key].key, metrics);

      setHasError(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setHasError(true);
    }
  };

  return (
    <Stack verticalAlign="space-between" styles={stackStyles}>
      <div style={{ overflowY: "auto" }}>
        <Stack verticalAlign="space-between" styles={stackStyles} tokens={stackTokens}>
          <Controls
            areaType={areaType}
            onChangeAreaType={onChangeAreaType}
            areaName={areaName[areaType.key]}
            onChangeAreaName={onChangeAreaName}
            metrics={metrics}
            onChangeMetrics={onChangeMetrics}
            onClick={handleInsertRange}
          />
          <Text variant="xSmall">
            This add-in uses the official UK government{" "}
            <Link href="https://coronavirus.data.gov.uk/developers-guide">API</Link>, which gives access to the full
            range of <Link href="https://coronavirus.data.gov.uk/about-data">data</Link> in the official{" "}
            <Link href="https://coronavirus.data.gov.uk/">&quot;Coronavirus (COVID-19) in the UK&quot;</Link> site.
          </Text>
        </Stack>
      </div>
      {hasError && (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={false}
          onDismiss={() => setHasError(false)}
          dismissButtonAriaLabel="Close"
        >
          {error.message}
        </MessageBar>
      )}
      <BrandBar />
    </Stack>
  );
}
