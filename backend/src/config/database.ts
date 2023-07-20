import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions).then(
    (data) => console.log(`MongoDb is Connected To ${data.connection.host}`),
    (error) => console.log(error)
  );
};
