// Airtable configuration
const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);

const table = base("coffeeStores");
// End of airtable configuration

// Filter the retrieved data
const getMinifiedRecord = (record) => {
  return {
    ...record.fields,
  };
};

const getMinifiedRecords = (recordsData) => {
  return recordsData.map((record) => getMinifiedRecord(record));
};
// End of Section

// Read a recod from table
const findRecordFilter = async (id) => {
  const findCoffeeStoreRecords = await table
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();

  return getMinifiedRecords(findCoffeeStoreRecords);
};

// End of Section

export { table, getMinifiedRecords, findRecordFilter };
