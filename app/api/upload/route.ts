import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import path from 'path';
import { Readable } from 'stream';
import { IncomingMessage } from 'http';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

// Define a mock socket type
type MockSocket = {
  write: () => void;
  end: () => void;
  destroy: () => void;
  setTimeout: () => void;
  address: () => {};
  remoteAddress: string | null;
  remotePort: number | null;
  ref: () => void;
  unref: () => void;
};

// Mocking a simple socket object
function createMockSocket(): MockSocket {
  return {
    write: () => {},
    end: () => {},
    destroy: () => {},
    setTimeout: () => {},
    address: () => ({}),
    remoteAddress: null,
    remotePort: null,
    ref: () => {},
    unref: () => {},
  };
}

// Utility function to convert NextRequest to a mock IncomingMessage
function createMockIncomingMessage(req: NextRequest): Readable & IncomingMessage {
  const stream = new Readable({
    read() {}, // No-op _read implementation
  });

  req.body?.getReader().read().then(({ value, done }) => {
    if (!done && value) {
      stream.push(value);
    }
    stream.push(null); // End the stream
  });

  const mockIncomingMessage = Object.assign(stream, {
    headers: Object.fromEntries(req.headers.entries()), // Copy headers
    method: req.method || 'GET', // Copy HTTP method
    url: req.url || '', // Copy URL
    httpVersion: '1.1',
    httpVersionMajor: 1,
    httpVersionMinor: 1,
    aborted: false,
    complete: true, // Mark request as complete
    connection: createMockSocket(), // Mock socket
    socket: createMockSocket(), // Mock socket
    trailers: {},
    rawHeaders: [],
    rawTrailers: [],
    setTimeout: () => {}, // Mock setTimeout function
  });

  return mockIncomingMessage as unknown as Readable & IncomingMessage;
}

export async function POST(req: NextRequest) {
  try {
    const reqStream = createMockIncomingMessage(req);

    const form = formidable({
      uploadDir: path.join(process.cwd(), '/public/uploads'),
      keepExtensions: true,
    });

    const { fields, files } = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(reqStream as IncomingMessage, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!uploadedFile) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const fileUrl = `/uploads/${uploadedFile.newFilename}`;
    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'File upload failed', error: error.message },
      { status: 500 }
    );
  }
}
