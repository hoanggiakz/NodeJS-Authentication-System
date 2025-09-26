const mongoose = require("mongoose"); // Importing mongoose for MongoDB interactions

const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/nodejs_auth_system", {
      // Mongoose 6+ no longer needs these options, but you can include them if needed
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB using mongoose");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process if cannot connect to database
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to application termination');
  process.exit(0);
});

module.exports = { connectUsingMongoose };