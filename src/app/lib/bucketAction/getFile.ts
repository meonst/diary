import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "./client";
const awsS3Bucket = process.env.MY_AWS_BUCKET;

export async function getSignedFileUrl(fileName: string) {
  if (fileName == "") return "";
  const params = {
    Bucket: awsS3Bucket,
    Key: fileName,
    body: "",
  };

  const command = new GetObjectCommand(params);

  const url = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });
  return url;
}
