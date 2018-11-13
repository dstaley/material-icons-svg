const fs = require("fs");
const child = require("child_process").execSync;
const pkg = require("../package.json");

// Copy SVG files to dist folder
child("cp -r icons dist/");

fs.writeFileSync(
  "dist/package.json",
  JSON.stringify(
    {
      ...pkg,
      private: false
    },
    null,
    2
  )
);
