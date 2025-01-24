import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nije pronađena datoteka" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generiranje jedinstvenog imena datoteke
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Postavke za upload
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    };

    // Upload na S3
    await s3Client.send(new PutObjectCommand(params));

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.error("Greška pri uploadu:", error);
    return NextResponse.json(
      { error: "Greška pri uploadu datoteke" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json(
        { error: "Nije specificiran fileName" },
        { status: 400 }
      );
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
    };

    // Generiranje signed URL-a koji vrijedi 3600 sekundi (1 sat)
    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("Greška pri dohvaćanju slike:", error);
    return NextResponse.json(
      { error: "Greška pri dohvaćanju slike" },
      { status: 500 }
    );
  }
}
