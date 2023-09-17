const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());
app.use(express.static('public'));

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Read existing users from JSON file
    const users = getUsers();

    // Check if username already exists
    if (users.find(user => user.username === username)) {
        res.send('Username already exists.');
        return;
    }

    // Hash the password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).send('Error registering user.');
            return;
        }

        // Save the new user
        users.push({ username, password: hash });
        saveUsers(users);

        res.send('Registration successful.');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Read existing users from JSON file
    const users = getUsers();

    // Find the user by username
    const user = users.find(user => user.username === username);

    // If user not found or password doesn't match, return error
    if (!user || !bcrypt.compareSync(password, user.password)) {
        res.send('Invalid username or password.');
        return;
    }

    res.send('Login successful.');
});

app.post('/keygen', (req, res) => {
    const { masterPassword } = req.body;

    // Check if the master password is correct
    if (masterPassword !== 'ADMIN1') {
        res.send('Invalid master password.');
        return;
    }

    // Generate a key (for simplicity, a random string)
    const key = generateRandomKey();

    // Save the key and expiration (adjust expiration logic as needed)
    saveKey(key);

    res.send(`Key generated: ${key}`);
});

// Helper function to read users from JSON file
function getUsers() {
    const usersData = fs.readFileSync('users.json');
    return JSON.parse(usersData);
}

// Helper function to save users to JSON file
function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// Helper function to save the key (modify as needed)
function saveKey(key) {
    fs.writeFileSync('key.txt', key);
}

// Helper function to generate a random key (for simplicity)
function generateRandomKey() {
    const length = 16;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
