import * as React from "react";
import { IDropdownOption, Stack, IStackStyles, IStackTokens, Link, Text } from "office-ui-fabric-react";
import Progress from "./Progress";
import BrandBar from "./BrandBar";
import Controls from "./Controls";
import { getData } from "../../lib/getData";
/* global Button, console, Excel, Progress */

const stackStyles: IStackStyles = {
  root: {
    height: "100%"
  }
};

const stackTokens: IStackTokens = {
  padding: `12px 8px 12px 4px`
};

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export default function App({ title, isOfficeInitialized }: AppProps) {
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

  const click = async () => {
    try {
      await Excel.run(async context => {
        const range = context.workbook.getSelectedRange();

        const filters = [`areaType=${areaType.key}`];

        if (areaType.key !== "overview") {
          filters.push(`areaName=${areaName[areaType.key].key}`);
        }

        const structure = [...metrics.map(d => [d, d])].reduce((obj, [key, val]) => {
          obj[key] = val;
          return obj;
        }, {});

        const apiParams = {
          filters: filters.join(";"),
          structure: JSON.stringify(structure)
        };

        const data = await getData(apiParams);
        const values = [Object.keys(data.data[0]), ...data.data.map(d => Object.values(d))];

        const firstCell = range.getCell(0, 0);
        const lastCell = range.getCell(values.length - 1, values[0].length - 1);
        const rangeToPopulate = firstCell.getBoundingRect(lastCell).insert(Excel.InsertShiftDirection.down);

        rangeToPopulate.values = values;

        await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOfficeInitialized) {
    return (
      <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
    );
  }

  return (
    <Stack verticalAlign="space-between" styles={stackStyles}>
      <Stack verticalAlign="space-between" styles={stackStyles} tokens={stackTokens}>
        <div className="ms-Grid" dir="ltr">
          <Controls
            areaType={areaType}
            onChangeAreaType={onChangeAreaType}
            areaName={areaName[areaType.key]}
            onChangeAreaName={onChangeAreaName}
            metrics={metrics}
            onChangeMetrics={onChangeMetrics}
            onClick={click}
          />
        </div>
        <div className="ms-Grid ms-motion-fadeIn ms-motion-duration-4" dir="ltr">
          <Text variant="small">
            This add-in uses the official UK government{" "}
            <Link href="https://coronavirus.data.gov.uk/developers-guide">API</Link>, which gives access to the full
            range of <Link href="https://coronavirus.data.gov.uk/about-data">data</Link> in the official{" "}
            <Link href="https://coronavirus.data.gov.uk/">&quot;Coronavirus (COVID-19) in the UK&quot;</Link> site.
          </Text>
        </div>
      </Stack>
      <BrandBar />
    </Stack>
  );
}
