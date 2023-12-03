import fs from "fs";
import Jimp from "jimp";
import path from "path";
let __dirname = path.resolve();

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
 export async function filterImageFromURL(inputURL) {
  return new Promise( async (resolve, reject) => {
    try {
        const photo = await Jimp.read(inputURL);
        const path = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
        await photo
        .resize(256, 256) 
        .quality(60) 
        .greyscale() 
        .write(__dirname+path, (img)=>{
            resolve(__dirname+path);
        });
    } catch (error) {
        reject("Image filtering failed: Did you provide a valid URL?");
    }
});
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
 export async function deleteLocalFiles(files) {
  for( let file of files) {
    fs.unlinkSync(file);
  }
}
