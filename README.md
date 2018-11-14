# Material Design Icons SVG

This package provides React Components and SVG files for [Material Icons](https://material.io/tools/icons/?style=baseline), including all five themes.

## Install

`npm install material-icons-svg`

## Usage

### As a React Component

```js
import AccountCircle from "material-icons-svg/components/baseline/AccountCircle";

const User = ({ user }) => (
  <div>
    {/* React Components also support passing props to the SVG element. */}
    <span>
      <AccountCircle fill="#ececec" />
      {user.name}
    </span>
  </div>
);
```

### As an SVG file

```js
import accountCircle from "material-icons-svg/icons/baseline-account_circle-24px.svg";

const User = ({ user }) => (
  <div>
    <span>
      <img src={accountCircle} />
      {user.name}
    </span>
  </div>
);
```

## Hacking on `material-icons-svg`

### Downloading Icons

The SVG files stored in the `icons` folder can be downloaded by running the included `download.go` file with `go run download.go`. These files should be kept in version control in order to easily track changes.

### Building

After downloading the original SVG files, `npm run build` will run the build process. The SVG files will be converted to TypeScript React components with `svgr` and stored in a `ts-components` folder. TypeScript will then compile the components into JavaScript files stored in a `components` folder.
