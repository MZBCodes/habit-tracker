const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { connectToDatabase, getDb, findDocuments } = require('./config/mongo'); // Import MongoDB connection setup
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}

const PORT = process.env.PORT || 5000;
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
            app.use(cors(corsOptions));
            // Routes
            app.use('/api/auth/', authRoutes)
            app.use('/api/habits/', habitRoutes)
            app.use('/api/user/', userRoutes)

            app.listen(PORT, () => {
                console.log(`Express server running on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
            process.exit(1); // Exit the process with an error code
        })
)
app.use(express.json());



