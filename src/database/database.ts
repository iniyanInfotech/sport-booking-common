const mongoose = require("mongoose");
import log from "../shared/log";

// MongoDB connection URL
const mongoURL = String(process.env.DB_URI);

// Establish the connection with options
mongoose.connect(mongoURL, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if server selection fails
    socketTimeoutMS: 45000, // Socket timeout after 45 seconds
    connectTimeoutMS: 5000, // Connect timeout after 5 seconds
    // Other options
    maxPoolSize: 100,
    retryWrites: true,
    w: 'majority',
    heartbeatFrequencyMS: 10000,
})
.then(() => {
    log.info('Connected to MongoDB');
})
.catch((error: any) => {
    log.error('Error connecting to MongoDB:', error.message);

    // Handle specific error conditions
    if (error instanceof mongoose.Error.MongoNetworkError) {
        log.error('Network error occurred. Check your MongoDB server.');
    } else if (error instanceof mongoose.Error.MongooseServerSelectionError) {
        log.error('Server selection error. Ensure MongoDB is running and accessible.');
    } else {
        // Handle other types of errors
        log.error('An unexpected error occurred:', error);
    }
});

// Handling connection events
const db = mongoose.connection;

db.on('error', (error: any) => {
    log.error('MongoDB connection error:', error);
});

db.once('open', () => {
    log.info('Connected to MongoDB');
});

db.on('disconnected', () => {
    log.info('Disconnected from MongoDB');
});

// Gracefully close the connection when the application exits
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        log.info('Mongoose connection is disconnected due to application termination');
        process.exit(0);
    });
});

export default db;