import mongoose from 'mongoose';

const uri = "mongodb+srv://cordadmin:VikasOP@cluster0.inyvrgo.mongodb.net/yogease?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}

async function disconnect() {
    try {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error(err);
    }
}

export { connect, disconnect };
