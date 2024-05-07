import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db;

const client = new mongodb.MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connect = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(process.env.DB_NAME);
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  } 
};

export { connect, db };
