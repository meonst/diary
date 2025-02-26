import { S3Client } from "@aws-sdk/client-s3";

const awsAccessKey = process.env.MY_AWS_ACCESS_KEY as string;
const awsSecretKey = process.env.MY_AWS_SECRET_KEY as string;
const awsS3BucketRegion = process.env.MY_AWS_REGION as string;

export const s3 = new S3Client({
  region: awsS3BucketRegion,
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
});
