const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.all('*', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        res.status(400).json({ error: 'Missing `url` query parameter' });
        return;
    }

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: req.headers,
            body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
        });
        const data = await response.text();
        res.status(response.status).send(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ error: 'Proxy server error' });
    }
});

module.exports = app;
