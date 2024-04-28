import AWS from "aws-sdk";
import Constants from "./Constants";
const S3_BUCKET = Constants.S3.S3_BUCKET;
const REGION = Constants.S3.REGION;
const ACCESS_KEY = Constants.S3.ACCESS_KEY;
const SECRET_ACCESS_KEY = Constants.S3.SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const MyBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});
export default MyBucket;
