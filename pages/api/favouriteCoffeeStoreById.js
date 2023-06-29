import { table, findRecordFilter, getMinifiedRecords } from "@/lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
    if (req.method === "PUT") {
        try {
          const { id } = req.body;
          if (id) {
            // Find a Record
            const records = await findRecordFilter(id);

            // Update the record
            if (records.length !== 0) {
              const record = records[0];
              const updatedRecord = await table.update([{
                id: record.recordId,
                fields: {
                    voting: parseInt(record.voting) + 1,
                },
              }]);
              if(updatedRecord){
                res.json(getMinifiedRecords(updatedRecord));
              }else{
                res.json({ message: "Upvote update Failed" });
              }
            } else {
              // render an error message
              res.json({ message: "Coffee Store Id doesn't exist", id });
            }
          } else {
            res.status(400);
            res.json({ message: "Id is missing" });
          }
        } catch (err) {
          res.status(500);
          res.json({ message: "Error upvoting the store!", err });
        }
      }
}

export default favouriteCoffeeStoreById;