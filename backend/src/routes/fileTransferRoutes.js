const express = require('express');
const router = express.Router();
const fileTransferController = require('../controllers/fileTransferController');

// API route to initiate file transfer
router.post('/transfer', async (req, res) => {
  try {
    const { sourceFileId, destinationDirectoryId } = req.body;

    // Download the file
    const downloadMessage = await fileTransferController.downloadFile(sourceFileId, 'downloaded-file.ext');

    // Upload the file to the destination directory
    const uploadMessage = await fileTransferController.uploadFile('downloaded-file.ext', destinationDirectoryId);

    // Send a success response
    res.status(200).json({ message: `${downloadMessage} ${uploadMessage}` });
  } catch (error) {
    console.error('Error:', error);

    // Handle errors and send responses
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.statusText });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

module.exports = router;
