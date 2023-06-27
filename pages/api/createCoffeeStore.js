import { table, getMinifiedRecords } from "@/lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { id, name, neighbourhood, address, voting, imgUrl } = req.body;
      if (id) {
        // Find a Record
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          res.json(getMinifiedRecords(findCoffeeStoreRecords));
        } else {
          // Create a record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json({ message: "Coffee Store record is created!", records });
          } else {
            res.status(400);
            res.json({ message: "Name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (err) {
      console.error("Error finding the store", err);
      res.status(500);
      res.json({ message: "Error finding the store" });
    }
  }
};

export default createCoffeeStore;
