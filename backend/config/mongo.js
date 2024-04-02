const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Default MongoDB connection string
const dbName = 'public'; // Replace with your database name

let db = null;
let client = null;

async function connectToDatabase() {
    try {
        // Create a new MongoClient
        client = new MongoClient(uri);

        // Connect the client to the server
        await client.connect();
        console.log('Connected to MongoDB');

        // Access the database
        db = client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async function findDocuments(collectionName) {
    const collection = db.collection(collectionName);
    const cursor = collection.find({});
    const documents = await cursor.toArray();
    return documents;
}

function getDb() {
    if (!db) {
        throw new Error('Database not connected');
    }
    console.log("Database recieved")
    return db;
}

async function closeConnection() {
    try {
        await client.close();
        console.log('Connection to MongoDB closed');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        throw error;
    }
}

const run = async () => {
    await connectToDatabase();
    const documents = await findDocuments('users');
    console.log(documents[0].chords);
    await closeConnection();
}

module.exports = { connectToDatabase, getDb, findDocuments };