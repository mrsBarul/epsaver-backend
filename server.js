const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./Routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middleware');

require('dotenv').config();

mongoose.set("strictQuery", false);

const PORT = 8000 || process.env.port;
const mongo = process.env.MONGODB_LINK;
const client = process.env.CLIENT_URL;
const api = process.env.API_URL;

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(cookieParser());
app.use(routes);
app.use(errorMiddleware);

mongoose
.connect(process.env.MONGODB_LINK)
.then(() => console.log("we were connected to mongo"))
.catch((err) => console.log(err));


app.listen(PORT, () => {
    console.log(`I am listening on PORT ${PORT}`);
    console.log(`I am listening on PORT ${mongo, client, api}`);
});
