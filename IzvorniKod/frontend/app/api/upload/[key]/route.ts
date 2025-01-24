import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const key = (await params).key; // 'a', 'b', or 'c'

    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    };

    const command = new GetObjectCommand(s3Params);
    const response = await s3Client.send(command);

    if (!response.Body) {
      throw new Error("Nije pronađena slika");
    }

    // Pretvaranje streama u ArrayBuffer
    const chunks = [];
    for await (const chunk of response.Body as Readable) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Vraćanje slike s odgovarajućim Content-Type
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": response.ContentType || "image/jpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Greška pri dohvaćanju slike:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  };

  const command = new DeleteObjectCommand(s3Params);
  await s3Client.send(command);

  return NextResponse.json({ message: "File deleted" });
}
