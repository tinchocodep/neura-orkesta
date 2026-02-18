
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Jimp } = require('jimp');

async function removeBlackBackground(inputPath, outputPath) {
    try {
        const image = await Jimp.read(inputPath);

        // Scan every pixel
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            // Get RGBA values
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];

            // If pixel is very dark (close to black), make it transparent
            // Threshold < 15/255
            if (r < 15 && g < 15 && b < 15) {
                this.bitmap.data[idx + 3] = 0; // Set alpha to 0
            }
        });

        await image.write(outputPath);
        console.log(`Processed image saved to ${outputPath}`);
    } catch (err) {
        console.error('Error processing image:', err);
        process.exit(1);
    }
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node remove_black_bg.js <input_path> <output_path>');
    process.exit(1);
}

removeBlackBackground(args[0], args[1]);
