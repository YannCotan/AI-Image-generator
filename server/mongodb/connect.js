import mongoose from 'mongoose';

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then(() => console.log('Connecté a la base de donée MongoDB'))
        .catch((err)  => console.error(err))

}

export default connectDB;