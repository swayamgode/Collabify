const app = require('./app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
});
