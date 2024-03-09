import React, { useState } from "react";

import MyBucket from "./utils/MyBucket";

const UploadImageToS3WithNativeSdk = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const S3_BUCKET = "techpack-blog";
  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: `profilePic/${file.name}`,
    };

    MyBucket.putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(evt);
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input type='file' onChange={handleFileInput} />
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
  );
};

export default UploadImageToS3WithNativeSdk;
