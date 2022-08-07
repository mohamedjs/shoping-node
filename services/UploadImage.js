import Resize from "./Resize.js";
import path from 'path';
const __dirname = path.resolve();

export default class UploadImage {
    static async upload(req) {
        const imagePath = path.join(__dirname, '/public/images');
        const fileUpload = new Resize(imagePath);
        const filename = await fileUpload.save(req.file.buffer);
        return filename;
    }
}