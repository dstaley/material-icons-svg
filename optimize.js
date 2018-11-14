const glob = require("glob");
const path = require("path");
const svgr = require("@svgr/core").default;
const fsUtils = require("./fs-utils");

const ICON_VARIANTS = ["baseline", "outline", "round", "twotone", "sharp"];
const DEST_FOLDER = "ts-components";

function getFilepaths() {
  return new Promise((resolve, reject) => {
    glob("icons/**/*.svg", (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
}

function typescriptComponentTemplate(code, config, state) {
  return (
    `import React from 'react';\n\n` +
    `const ${
      state.componentName
    }: React.SFC<React.SVGProps<SVGSVGElement>> = props => ${code}\n` +
    `export default ${state.componentName}`
  );
}

async function createComponent(svgFile) {
  const jsCode = await svgr(
    svgFile,
    {
      icon: true,
      template: typescriptComponentTemplate
    },
    { componentName: "ReactComponent" }
  );
  return jsCode;
}

function generateComponentName(filePath) {
  const filename = path.basename(filePath);
  const parts = filename.split("-");
  return parts[1]
    .replace(/_([a-z])/g, g => {
      return g[1].toUpperCase();
    })
    .replace(/^([a-z])/g, g => {
      return g[0].toUpperCase();
    });
}

function getVariant(filePath) {
  return path.basename(filePath).split("-")[0];
}

async function makeVariantFolders() {
  for (variant of ICON_VARIANTS) {
    const variantFolder = path.join(__dirname, DEST_FOLDER, variant);
    await fsUtils.makeDirectory(variantFolder);
  }
}

async function optimize(filePath) {
  const contents = await fsUtils.readFile(filePath);
  const svgFile = await createComponent(contents);
  const variant = getVariant(filePath);
  const variantFolder = path.join(__dirname, DEST_FOLDER, variant);
  const outputFilename = `${generateComponentName(filePath)}.tsx`;

  await fsUtils.writeFile(path.join(variantFolder, outputFilename), svgFile);
}

(async () => {
  try {
    const files = await getFilepaths();
    await fsUtils.makeDirectory(DEST_FOLDER);
    await makeVariantFolders();
    await Promise.all(files.map(optimize));
  } catch (err) {
    console.error(err);
  }
})();
