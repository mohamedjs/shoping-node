import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export default class Resize {
    /**
     * The constructor function is a function that is called when an object is created from a class.
     * @param folder - The folder to be created.
     */
    constructor(folder) {
        this.folder = folder;
    }
    /**
     * This function takes a buffer, creates a filename, creates a filepath, resizes the buffer to
     * 300x300, and then saves the file to the filepath.
     * @param buffer - The image buffer that we want to resize.
     * @returns The filename is being returned.
     */
    async save(buffer) {
        const filename = Resize.filename();
        const filepath = this.filepath(filename);

        await sharp(buffer)
            .resize(300, 300, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFile(filepath);

        return filename;
    }
    /**
     * It generates a random filename for the image.
     * @returns A string with a random UUID and the .png extension.
     */
    static filename() {
        return `${uuidv4()}.png`;
    }
    /**
     * It takes a filename as an argument and returns the path to that file.
     * @param filename - The name of the file to be saved.
     * @returns The path.resolve() method resolves a sequence of paths or path segments into an
     * absolute path.
     */
    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}