const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

async function UploadToS3(filename) {
  //function that uploads cv to s3 bucket and returns the file link
  let fileLink = "-";
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  await new Promise((resolve, reject) => {
    //read the file from the server first before uploading
    const filepath = path.join(__dirname, "..", "..", "utils", "CVs");
    const fileContent = fs.readFileSync(filepath + "/" + filename);
    resolve({ fileContent, filename });
  }).then(async (filedata) => {
    await s3
      .upload(
        //uploads the file to s3 bucket
        {
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: filedata.fileContent,
          Key: `${filedata.filename}`,
        },
        (err, data) => {
          if (err) {
            throw err;
          }
          return data.Location;
        }
      )
      .promise()
      .then((data) => {
        //save file location to the global variable
        fileLink = data.Location;
        return;
      })
      .catch((err) => {
        console.log(err);
      });
    return fileLink;
  });
  return fileLink;
}

module.exports = { UploadToS3 };
