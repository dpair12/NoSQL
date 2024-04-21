const { connect, connection } = require('mongoose');

const dbName = 'SocialNetwork';

connect(`mongodb://127.0.0.1:27017/${dbName}`);

connection.once('open', async () => {
try {
console.log('Succesfully connected to mongoose!')
console.log(`Connected to ${dbName} database!`);
} catch (err) {
console.log(`Connection error to ${dbName} database: ${err}`);
}
});

module.exports = connection;
