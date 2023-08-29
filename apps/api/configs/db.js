const mongoose = require('mongoose');

const dbUri = process.env.MONGODB_URI;

exports.connect = () => {
  mongoose.connect(
    dbUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) {
        console.log('DB connection failed');
        console.log(error);

        return process.exit(1);
      }

      console.log('Connected to DB');
    }
  );
};
