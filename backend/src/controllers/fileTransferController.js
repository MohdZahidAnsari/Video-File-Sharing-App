const { google } = require('googleapis');
const fs = require('fs');


// id - 646295218485-drhghe18vvlu30i53hlk54bqa266vusn.apps.googleusercontent.com

// Set up the Google Drive API client (configure your credentials)
const auth = new google.auth.GoogleAuth({
  keyFile: 'AIzaSyCrBBVoDgNlwgurztM2Blsc8h_Hz2CdinU', // Replace with your service account key file
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

// Function to download a file from Google Drive
async function downloadFile(fileId, destinationPath) {
  const response = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
  const dest = fs.createWriteStream(destinationPath);
  return new Promise((resolve, reject) => {
    response.data
      .on('end', () => {
        resolve(destinationPath);
      })
      .on('error', (err) => {
        reject(err);
      })
      .pipe(dest);
  });
}

// Function to upload a file to Google Drive
async function uploadFile(filePath, folderId) {
  const fileMetadata = {
    name: 'videofile.ext', // Replace with the desired file name
    parents: [646295218485-drhghe18vvlu30i53hlk54bqa266vusn.apps.googleusercontent.com], // Replace with the destination folder ID
  };

  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(filePath),
  };

  await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id',
  });
}

module.exports = {
  downloadFile,
  uploadFile,
};
