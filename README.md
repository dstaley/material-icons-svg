# Material Design Icons SVG

## Downloading Icons

The SVG files stored in the `icons` folder can be downloaded by running the included `download.go` file with `go run download.go`. These files should be kept in version control in order to easily track changes.

## Building

After downloading the original SVG files, `npm run build` will run the build process. The SVG files will be converted to TypeScript React components with `svgr` and stored in the `components` folder. TypeScript will then compile the components into JavaScript files stored in the `dist` folder. Finally, the original SVG icons will be copied to the `dist` folder along with a `package.json` file.
