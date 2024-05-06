const { connect, connection } = require('mongoose');
//Assigning Database name
const dbName = 'SocialNetwork';

//MongoDb Connection
connect(`mongodb://127.0.0.1:27017/${dbName}`);

//Instructions on what to do once connection is established to MongoDB
connection.once('open', async () => {
try {
console.log('Succesfully connected to mongoose!')
console.log(`Connected to ${dbName} database!`);
} catch (err) {
console.log(`Connection error to ${dbName} database: ${err}`);
}
});

module.exports = connection;
