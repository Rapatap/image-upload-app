import formidable from 'formidable';
import fs from 'fs-extra';
import path from 'path';

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join('/tmp');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log('Error parsing form:', err);
      return res.status(500).json({ error: 'Error uploading image.' });
    }

    const filePath = files.image.path;
    const fileName = files.image.name;

    fs.rename(filePath, path.join('/tmp', fileName), (err) => {
      if (err) {
        console.log('Error renaming file:', err);
        return res.status(500).json({ error: 'Error uploading image.' });
      }

      return res.status(200).end();
    });
  });
}
