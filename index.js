import express from 'express';
import dotenv from 'dotenv';




// configure dotenv
dotenv.config();
const PORT = process.env.PORT || 5009;



// initialize express
const app = express();

// parse body 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes


// handle 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page is not found' });
});

// error
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});
// listen
app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`);
});
