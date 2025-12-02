import sharp from "sharp";
import fs from "fs";
import path from "path";

async function convertGifToWebp(inputPath, outputPath) {
  try {
    // Ensure the input file exists
    if (!fs.existsSync(inputPath)) {
      console.error("Input file not found:", inputPath);
      return;
    }

    await sharp(inputPath, { animated: true })
      .webp({
        quality: 80,
        effort: 4,
        lossless: false,
        loop: 0     // infinite loop like GIF
      })
      .toFile(outputPath);

    console.log(`Converted: ${inputPath} → ${outputPath}`);
  } catch (err) {
    console.error("Error converting GIF:", err);
  }
}

// Example usage:
const input = process.argv[2];
if (!input) {
  console.error("Usage: node gif-to-webp.js <input.gif>");
  process.exit(1);
}

const ext = path.extname(input);
const base = input.replace(ext, "");
const output = `${base}.webp`;

convertGifToWebp(input, output);
