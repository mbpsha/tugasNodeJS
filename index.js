const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// In-memory user storage (for demonstration purposes only)
const users = []

//API endpoint for user registration
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(u => u.username === username);

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const validUser = users.find(u => u.username === username && u.password === password);

    if (validUser){
        res.json({ message: 'Login successful', username: validUser.username });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});