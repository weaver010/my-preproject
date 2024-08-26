const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// JSON Middleware
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const mangaRoutes = require('./routes/mangaRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/manga', mangaRoutes);

// Sync Sequelize models with the database and start the server
sequelize.sync({ alter: true })  // Syncs your models, adding missing columns, etc.
    .then(() => {
        app.listen(5000, () => {
            console.log('Server is running on http://localhost:5000');
        });
    })
    .catch((err) => console.error('Database sync failed:', err));


