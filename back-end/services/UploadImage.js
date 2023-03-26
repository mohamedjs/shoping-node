import Resize from "./Resize.js";
import path from 'path';
import fs from 'fs';
const __dirname = path.resolve();

export default class UploadImage {
    /**
     * It takes a file from the request and saves it to a folder.
     * @param req - The request object
     * @param folderName - The name of the folder you want to save the image to.
     * @returns The filename of the image that was uploaded.
     */
    static async upload(req, folderName) {
        const imagePath = path.join(__dirname, `/public/${folderName}`);
        if (!fs.existsSync(imagePath)){
            fs.mkdirSync(imagePath, { recursive: true });
        }
        const fileUpload = new Resize(imagePath);
        const filename = await fileUpload.save(req.file.buffer);
        return filename;
    }
}