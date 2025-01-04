import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import path from 'path';
import { Readable } from 'stream';

// Use edge runtime for this API route
export const runtime = 'edge';

// Utility function to handle the request body as a stream
async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();

  let done = false;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    if (value) {
      chunks.push(value);
    }
  }

  return Buffer.concat(chunks);
}

// Utility function to parse form data using formidable
const parseFormData = async (req: NextRequest) => {
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    const form = formidable({
      uploadDir: path.join(process.cwd(), '/public/uploads'),
      keepExtensions: true,
    });

    // Convert the NextRequest body stream into a buffer
    const bodyBuffer = streamToBuffer(req.body as ReadableStream<Uint8Array>);

    bodyBuffer
      .then((buffer) => {
        const reqStream = Readable.from(buffer);

        form.parse(reqStream as any, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      })
      .catch(reject);
  });
};

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const { fields, files } = await parseFormData(req);

    // Check if the file is uploaded
    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!uploadedFile) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Construct the file URL for the uploaded file
    const fileUrl = `/uploads/${uploadedFile.newFilename}`;
    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (error: any) {
    // Handle errors
    return NextResponse.json(
      { message: 'File upload failed', error: error.message },
      { status: 500 }
    );
  }
}
