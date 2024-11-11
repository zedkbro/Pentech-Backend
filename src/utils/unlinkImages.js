import fs from 'fs';
import path from 'path';

const currentDirectory = process.cwd();
const publicImagesFolderPath = path.join(currentDirectory, 'public', 'images');

export async function deleteImage(filename) {
    return new Promise(async (resolve, reject) => {
        try {
            const files = await fs.promises.readdir(publicImagesFolderPath).catch(err => {
                reject(new Error('Error reading files: ' + err.message));
            });
            const imageFile = files.find(file => file === filename);
            if (imageFile) {
                await fs.promises.unlink(path.join(publicImagesFolderPath, imageFile));
                resolve('Image file deleted successfully');
            } else {
                resolve('Sorry! Image file is not deleted yet!');
                // reject(new Error('Image file not found'));
            }
        } catch (err) {
            reject(new Error('Error deleting image file: ' + err.message));
        }
    });
}