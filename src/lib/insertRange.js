/* global Excel */
import { getData } from "./getData";

export const insertRange = async (areaType, areaName, metrics) => {
  await Excel.run(async context => {
    const range = context.workbook.getSelectedRange();

    const filters = [`areaType=${areaType}`];

    if (areaType !== "overview") {
      filters.push(`areaName=${areaName}`);
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
};
