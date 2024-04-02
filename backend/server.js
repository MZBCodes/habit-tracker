const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { connectToDatabase, getDb, findDocuments } = require('./config/mongo'); // Import MongoDB connection setup
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');

const PORT = process.env.PORT || 3000;
let db = null;
let documents = null;   

mongoose.connect('mongodb://localhost/public', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    connectToDatabase()
        .then(async () => {
            db = getDb();
            documents = await findDocuments("users")
        })
        .then(() => {
            console.log(documents)
            // Start the Express server after connecting to MongoDB
            app.listen(PORT, () => {
                console.log(`Express server running on port ${PORT}`);
            });

            // Routes
            app.get('/userID', (req, res) => {
                res.send(`Hello World! Connected to ${documents[0].user.password}`);
            });

            app.use('/api/auth/', authRoutes)
            app.use('/api/habits/', habitRoutes)
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
            process.exit(1); // Exit the process with an error code
        })
)
app.use(express.json());



