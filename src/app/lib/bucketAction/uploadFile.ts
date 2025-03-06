import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { currentTime } from "@/app/lib/misc/time";
import { s3 } from "@/app/lib/bucketAction/client";

const awsS3Bucket = process.env.MY_AWS_BUCKET;

async function getSignedFileUrl(fileName: string) {
  const params = {
    Bucket: awsS3Bucket,
    Key: fileName,
    body: ""
  };

  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });
  return url;
}

export async function uploadFile(file: File): Promise<string> {
  if (file.size == 0) return "";
  const newName = currentTime().concat(" ").concat(file.name);

  const url: string = await getSignedFileUrl(newName);
  try {
    const uploadRes = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-type": file.type,
      },
    });
    console.log(newName);
    return newName;
  } catch (err) {
    return "";
  }
}
