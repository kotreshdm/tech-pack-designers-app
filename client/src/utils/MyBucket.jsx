import AWS from "aws-sdk";
import S3Constants from "../components/constants/S3Constants";
const S3_BUCKET = S3Constants.S3_BUCKET;
const REGION = S3Constants.REGION;
const ACCESS_KEY = S3Constants.ACCESS_KEY;
const SECRET_ACCESS_KEY = S3Constants.SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const MyBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});
export default MyBucket;
