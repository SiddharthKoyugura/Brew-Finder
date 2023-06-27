// Airtable configuration
const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);

const table = base("coffeeStores");
// End of airtable configuration

const getMinifiedRecord = (record) => {
  return {
    ...record.fields,
  };
};

const getMinifiedRecords = (recordsData) => {
  return recordsData.map((record) => getMinifiedRecord(record));
};

export { table, getMinifiedRecords };
