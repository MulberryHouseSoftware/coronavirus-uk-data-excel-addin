import axios from "axios";

export const getData = async queries => {
  const endpoint = "https://api.coronavirus.data.gov.uk/v1/data";

  const { data, status, statusText } = await axios.get(endpoint, {
    params: queries,
    timeout: 10000
  });

  if (status >= 400) throw new Error(statusText);

  return data;
};
