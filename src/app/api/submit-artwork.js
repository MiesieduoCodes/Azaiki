import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

// Disable the default body parser to allow formidable to handle the request
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public/uploads'); // Set the upload directory
    form.keepExtensions = true; // Keep file extensions

    // Ensure the upload directory exists
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error during file upload:', err);
        return res.status(500).json({ message: 'Error uploading submission' });
      }

      // Access form data and file
      const { name, email, description, title } = fields;
      const artwork = files.artwork[0]; // Assuming the file is in the 'artwork' field

      // Move the file to the desired location
      const filePath = path.join(form.uploadDir, artwork.originalFilename);
      fs.renameSync(artwork.filepath, filePath);

      // Respond with a success message
      res.status(200).json({ message: 'Submission successful!' });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
