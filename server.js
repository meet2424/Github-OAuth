const express = require('express')

const app = express();

// config files
require('dotenv').config();


//Using the routes set up
app.use('/', require('./routes/auth'))

// ============================ ROOT ROUTE ==============================
app.get('/', (req, res) => {
    res.send('Hello GitHub auth')
})


//Specifying which port to run on
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})