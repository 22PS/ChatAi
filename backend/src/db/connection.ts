import { connect, disconnect } from 'mongoose';

async function connectTODatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error('Cannot Connect to MongoDB');
  }
}

async function disconnectToDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error('Could not Disconnect to MongoDB');
  }
}

export { connectTODatabase, disconnectToDatabase };
