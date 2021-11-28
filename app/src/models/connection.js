const { MongoClient } = require('mongodb');
require('dotenv').config();

let schema = null;

const { DB_HOSTNAME = 'localhost', DB_PORT = '27017', DB_DATABASE = 'webchat' } = process.env;

const DB_URL = `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`;

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_DATABASE))
    .then((dbSchema) => {
      console.log('Database: Connection success');
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.log({DB_HOSTNAME, DB_PORT, DB_DATABASE})
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection;
