// import mongo
const { MongoClient } = require("mongodb");

class MongoDB {
  constructor(url) {
    this.url = url;
    this.client = new MongoClient(url);
  }
}

/**
 * @returns {void}
 * @description Connect to MongoDB
 * @memberof MongoDB
 * @example
 * const mongodb = new MongoDB(MONGODB_CONNECTION_URL);
 * mongodb.connect();
 */

MongoDB.prototype.connect = async function () {
  try {
    await this.client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.log(err.stack);
  }
}

/**
 * @returns {void}
 * @description Disconnect from MongoDB
 * @example
 * const mongodb = new MongoDB(MONGODB_CONNECTION_URL);
 * mongodb.connect();
 * mongodb.disconnect();
 */
MongoDB.prototype.disconnect = async function () {
  try {
    await this.client.close();
    console.log("Disconnected successfully from MongoDB");
  } catch (err) {
    console.log(err.stack);
  }
}


/**
 * @param {string} dbName - The name of the database
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query to run
 * @returns {object} - The result of the query
 * @description Run a query on MongoDB
 * @example
 * const mongodb = new MongoDB(MONGODB_CONNECTION_URL);
 * mongodb.connect();
 * const result = await mongodb.query({
 *  dbName: "test",
 *  collectionName: "test",
 *  query: { name: "test" }
 * });
 * console.log(result);
 * // => [{ _id: 123, name: "test" }]
 * mongodb.disconnect();
 */
MongoDB.prototype.query = async function ({dbName, collectionName, query}) {
  try {
    const database = this.client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.find(query).toArray();
    return result;
  } catch (err) {
    console.log(err.stack);
  }
}



module.exports = MongoDB;

