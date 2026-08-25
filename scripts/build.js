const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const buildDirectory = path.join(root, "build");
fs.rmSync(buildDirectory, { recursive: true, force: true });
fs.mkdirSync(buildDirectory, { recursive: true });
fs.copyFileSync(path.join(root, "src", "module.js"), path.join(buildDirectory, "module.js"));

const iconFile = path.join(root, "icon.png");
if (!fs.existsSync(iconFile)) {
  const iconBase64 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAC0lEQVR42u3PQQ0AAAgDINc/9K3hHFQgE1vTuj0QCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCATCPwG7QAF/B4NnAAAAAElFTkSuQmCC";
  fs.writeFileSync(iconFile, Buffer.from(iconBase64, "base64"));
}
console.log("Cognigy extension build files are ready.");
