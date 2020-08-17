import * as React from "react";
import { PrimaryButton, Dropdown, IDropdownOption, IDropdownStyles, Stack, Text } from "office-ui-fabric-react";
/* global Button, console, Excel, Header, HeroList, HeroListItem, Progress */

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { maxWidth: 200 } };

const areaTypeOptions = [
  //{ key: "overview", text: "Overview" },
  { key: "nation", text: "Nation" },
  { key: "region", text: "Region" },
  { key: "nhsRegion", text: "NHS region" }
  //{ key: "utla", text: "UTLA" },
  //{ key: "ltla", text: "LTLA" }
];

const nationOptions = [
  { key: "England", text: "England" },
  { key: "Northern Ireland", text: "Northern Ireland" },
  { key: "Scotland", text: "Scotland" },
  { key: "Wales", text: "Wales" }
];

const regionOptions = [
  { key: "North East", text: "North East" },
  { key: "North West", text: "North West" },
  { key: "Yorkshire and The Humber", text: "Yorkshire and The Humber" },
  { key: "East Midlands", text: "East Midlands" },
  { key: "West Midlands", text: "West Midlands" },
  { key: "East of England", text: "East of England" },
  { key: "London", text: "London" },
  { key: "South East", text: "South East" },
  { key: "South West", text: "South West" }
];

const nhsRegionOptions = [
  { key: "London", text: "London" },
  { key: "South East", text: "South East" },
  { key: "South West", text: "South West" },
  { key: "East of England", text: "East of England" },
  { key: "Midlands", text: "Midlands" },
  { key: "North East and Yorkshire", text: "North East and Yorkshire" },
  { key: "North West", text: "North West" }
];

const areaNameOptions = {
  nation: nationOptions,
  region: regionOptions,
  nhsRegion: nhsRegionOptions
};

const metricsOptions = [
  { key: "date", text: "date" },
  { key: "hash", text: "hash" },
  { key: "newCasesByPublishDate", text: "newCasesByPublishDate" },
  { key: "cumCasesByPublishDate", text: "cumCasesByPublishDate" },
  { key: "cumCasesBySpecimenDateRate", text: "cumCasesBySpecimenDateRate" },
  { key: "newCasesBySpecimenDate", text: "newCasesBySpecimenDate" },
  { key: "cumCasesBySpecimenDate", text: "cumCasesBySpecimenDate" },
  //{ key: "maleCases", text: "maleCases" },
  //{ key: "femaleCases", text: "femaleCases" },
  { key: "newPillarOneTestsByPublishDate", text: "newPillarOneTestsByPublishDate" },
  { key: "cumPillarOneTestsByPublishDate", text: "cumPillarOneTestsByPublishDate" },
  { key: "newPillarTwoTestsByPublishDate", text: "newPillarTwoTestsByPublishDate" },
  { key: "cumPillarTwoTestsByPublishDate", text: "cumPillarTwoTestsByPublishDate" },
  { key: "newPillarThreeTestsByPublishDate", text: "newPillarThreeTestsByPublishDate" }
];

const stackTokens = { childrenGap: 32 };

export interface ControlsProps {
  areaType: IDropdownOption;
  onChangeAreaType: (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => void;
  areaName: IDropdownOption;
  onChangeAreaName: (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => void;
  metrics: string[];
  onChangeMetrics: (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => void;
  onClick: () => void;
}

export default function Controls({
  areaType,
  areaName,
  metrics,
  onChangeAreaType,
  onChangeAreaName,
  onChangeMetrics,
  onClick
}: ControlsProps) {
  return (
    <Stack tokens={stackTokens}>
      <Stack>
        <Text>Data can be filtered by Nation, Region, or NHS Region.</Text>
        <Dropdown
          label="Area type"
          selectedKey={areaType ? areaType.key : undefined}
          onChange={onChangeAreaType}
          placeholder="Select an option"
          options={areaTypeOptions}
          styles={dropdownStyles}
        />
      </Stack>
      <Stack>
        <Text>Choose which area you want to see data for (only a single area can be selected).</Text>
        <Dropdown
          label={areaType.text}
          selectedKey={areaName ? areaName.key : undefined}
          onChange={onChangeAreaName}
          placeholder="Select an option"
          options={areaNameOptions[areaType.key]}
          styles={dropdownStyles}
        />
      </Stack>
      <Stack>
        <Text>Choose which metrics you wish to be included (multiple metrics can be selected).</Text>
        <Dropdown
          placeholder="Select metrics"
          label="Metrics"
          selectedKeys={metrics}
          onChange={onChangeMetrics}
          multiSelect
          options={metricsOptions}
        />
      </Stack>
      <Stack>
        <Text>Data will be inserted using the currently selected cell as the top left of the new range.</Text>
        <PrimaryButton style={{ marginTop: "12px" }} onClick={onClick}>
          Insert data
        </PrimaryButton>
      </Stack>
    </Stack>
  );
}
