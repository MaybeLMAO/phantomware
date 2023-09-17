const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Define routes and implement your functionality here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
