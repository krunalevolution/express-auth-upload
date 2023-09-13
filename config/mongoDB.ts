import mongoose from "mongoose";

// mongo connection

const mongoConnect = async (DATABASE_URL : string) => {
    try {
        const DB_OPTIONS = {
            dbName:"expressdemo"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("DB Connected");
    } catch (error) {
        console.log("mongo connect =>",error);
    }
}

export default mongoConnect;