const { mongoose } = require("mongoose");

const connectDb = async () => {
  // console.log(process.env.CONNECTION_STRING);
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database connected:",
      connect.connection.host,
      connect.connection.name
    );
    // const database =
    //   "mongodb+srv://sudarshanrajpit2002:UOxMolAbX66KCbhS@cluster0.hgawduc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    // mongoose
    //   .connect(database)
    //   .then(() => console.log("e don connect"))
    //   .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
