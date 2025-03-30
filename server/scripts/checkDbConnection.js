require('dotenv').config();
const mongoose = require('mongoose');

async function checkConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connection successful!');
    console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
    
    // Get list of collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:');
    collections.forEach(coll => console.log(`- ${coll.name}`));
    
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');
  }
}

checkConnection();
