import * as React from "react";
import {
  PrimaryButton,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  Stack,
  TooltipHost,
  FontIcon,
  Label
} from "office-ui-fabric-react";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { useId } from "@uifabric/react-hooks";

/* global Button, console, Excel, Header, HeroList, HeroListItem, Progress */

const iconClass = mergeStyles({
  fontSize: 14,
  height: 14,
  width: 14,
  margin: "7px 7px 0 7px"
});

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

const stackTokens = { childrenGap: 8 };

export interface ControlsProps {
  areaType: IDropdownOption;
  onChangeAreaType: (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => void;
  areaName: IDropdownOption;
  onChangeAreaName: (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => void;
  metrics: string[];
  onChangeMetrics: (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => void;
  onClick: () => void;
}

export function Controls({
  areaType,
  areaName,
  metrics,
  onChangeAreaType,
  onChangeAreaName,
  onChangeMetrics,
  onClick
}: ControlsProps) {
  const tooltipId = useId("tooltip");

  return (
    <Stack tokens={stackTokens}>
      <Stack>
        <Label>
          <Stack horizontal verticalAlign="center">
            Area type{" "}
            <TooltipHost content="Data can be filtered by Nation, Region, or NHS Region." id={tooltipId}>
              <FontIcon iconName="Info" className={iconClass} />
            </TooltipHost>
          </Stack>
        </Label>
        <Dropdown
          selectedKey={areaType ? areaType.key : undefined}
          onChange={onChangeAreaType}
          placeholder="Select an option"
          options={areaTypeOptions}
          styles={dropdownStyles}
        />
      </Stack>
      <Stack>
        <Label>
          <Stack horizontal verticalAlign="center">
            {areaType.text}{" "}
            <TooltipHost
              content="Choose which area you want to see data for (only a single area can be selected)."
              id={tooltipId}
            >
              <FontIcon iconName="Info" className={iconClass} />
            </TooltipHost>
          </Stack>
        </Label>
        <Dropdown
          selectedKey={areaName ? areaName.key : undefined}
          onChange={onChangeAreaName}
          placeholder="Select an option"
          options={areaNameOptions[areaType.key]}
          styles={dropdownStyles}
        />
      </Stack>
      <Stack>
        <Label>
          <Stack horizontal verticalAlign="center">
            Metrics{" "}
            <TooltipHost
              content="Choose which metrics you wish to be included (multiple metrics can be selected)."
              id={tooltipId}
            >
              <FontIcon iconName="Info" className={iconClass} />
            </TooltipHost>
          </Stack>
        </Label>
        <Dropdown
          placeholder="Select metrics"
          selectedKeys={metrics}
          onChange={onChangeMetrics}
          multiSelect
          options={metricsOptions}
        />
      </Stack>
      <Stack>
        <PrimaryButton style={{ marginTop: "12px" }} onClick={onClick}>
          Insert data
        </PrimaryButton>
      </Stack>
    </Stack>
  );
}
