import { NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import cloudinary from '@/lib/cloudinary';
import fs from 'fs';
import { Readable } from 'stream';

// Tell Next.js not to parse the body
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      multiples: false,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return resolve(NextResponse.json({ error: 'File parsing failed' }, { status: 500 }));
      }

      const file = files.file;

      if (!file || !file.filepath) {
        return resolve(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }));
      }

      try {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'tutorial_images' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return resolve(NextResponse.json({ error: 'Cloudinary upload failed' }, { status: 500 }));
            }

            return resolve(NextResponse.json({ url: result.secure_url }, { status: 200 }));
          }
        );

        const fileStream = fs.createReadStream(file.filepath);
        fileStream.pipe(uploadStream);
      } catch (err) {
        console.error('Upload stream error:', err);
        return resolve(NextResponse.json({ error: 'Upload stream failed' }, { status: 500 }));
      }
    });
  });
}
