const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes Stubs

// Auth
app.post('/api/auth/signup', (req, res) => {
    // TODO: Implement signup logic
    res.status(501).json({ message: 'Not Implemented' });
});

app.post('/api/auth/login', (req, res) => {
    // TODO: Implement login logic
    res.status(501).json({ message: 'Not Implemented' });
});

// Campaigns (Brand)
app.get('/api/brand/campaigns', (req, res) => {
    // TODO: Fetch brand campaigns
    res.status(501).json({ message: 'Not Implemented' });
});

app.post('/api/brand/campaigns', (req, res) => {
    // TODO: Create new campaign
    res.status(501).json({ message: 'Not Implemented' });
});

// Campaigns (Influencer)
app.get('/api/influencer/campaigns/browse', (req, res) => {
    // TODO: Fetch available campaigns for influencer
    res.status(501).json({ message: 'Not Implemented' });
});

app.post('/api/influencer/campaigns/:id/apply', (req, res) => {
    // TODO: Apply to campaign
    res.status(501).json({ message: 'Not Implemented' });
});

// Earnings
app.get('/api/influencer/earnings', (req, res) => {
    // TODO: Fetch earnings history
    res.status(501).json({ message: 'Not Implemented' });
});

module.exports = app;
