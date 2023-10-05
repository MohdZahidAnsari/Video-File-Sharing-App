const express = require('express');
const app = express();
const cors = require('cors');
const fileTransferRoutes = require('./routes/fileTransferRoutes');

// Middleware
app.use(express.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
app.use('/', fileTransferRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
