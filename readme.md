# Phaser 3 + TypeScript + Parcel Template
> For people who want to spend time making Phaser 3 games in TypeScript instead of configuring build tools.

![License](https://img.shields.io/badge/license-MIT-green)

This is a TypeScript specific fork of [phaser3-parcel-template](https://github.com/ourcade/phaser3-parcel-template).

## Prerequisites

You'll need [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and [Parcel](https://parceljs.org/) installed.

It is highly recommended to use [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm) to install Node.js and npm.

For Windows users there is [Node Version Manager for Windows](https://github.com/coreybutler/nvm-windows).

Install Node.js and `npm` with `nvm`:

```bash
nvm install node

nvm use node
```

Replace 'node' with 'latest' for `nvm-windows`.

Then install Parcel:

```bash
npm install -g parcel-bundler
```

## Getting Started

Clone this repository to your local machine:

```bash
git clone https://github.com/officialyenum/phaser-game.git
```

This will create a folder named `phaser-game`. You can specify a different folder name like this:

```bash
git clone https://github.com/officialyenum/phaser-game.git my-folder-name
```

Go into your new project folder and install dependencies:

```bash
cd  officialyenum/phaser-game # or 'my-folder-name'
npm install
```

Start development server:

```
npm run start
```

To create a production build:

```
npm run build
```

Production files will be placed in the `dist` folder. Then upload those files to a web server. 🎉

## Project Structure

```
    .
    ├── dist
    ├── node_modules
    ├── public
    │   ├── assets
    │   │   ├── bomb.png
    │   │   ├── dude.png
    │   │   ├── platform.png
    │   │   ├── sky.png
    │   │   ├── star.png
    ├── src
    │   ├── scenes
    │   │   ├── GameScene.ts
    │   ├── index.html
    │   ├── main.ts
    ├── package.json
    ├── tsconfig.json
```

The contents of this template is the basic [Phaser 3 getting started example](http://phaser.io/tutorials/getting-started-phaser3/part5).

This template assumes you will want to organize your code into multiple files and use TypeScript.

TypeScript files are intended for the `src` folder. `main.ts` is the entry point referenced by `index.html`.

Other than that there is no opinion on how you should structure your project. There is a `scenes` folder in `src` where the `GameScene.ts` lives but you can do whatever you want.

## Static Assets

Any static assets like images or audio files should be placed in the `public` folder. It'll then be served at http://localhost:8000/images/my-image.png

Example `public` structure:

```
    public
    ├── images
    │   ├── bomb.png
    │   ├── dude.png
    │   ├── platform.png
    │   ├── sky.png
    │   ├── star.png
    ├── music
    │   ├── ...
    ├── sfx
    │   ├── ...
```

They can then be loaded by Phaser with `this.image.load('platform', 'images/platform.png')`.

## TypeScript ESLint

This template uses a basic `typescript-eslint` set up for code linting.

It does not aim to be opinionated.

## Dev Server Port

You can change the dev server's port number by modifying the `start` script in `package.json`. We use Parcel's `-p` option to specify the port number.

The script looks like this:

```
parcel src/index.html -p 8000
```

Change 8000 to whatever you want.

## Other Notes

[parcel-plugin-clean-easy](https://github.com/lifuzhao100/parcel-plugin-clean-easy) is used to ensure only the latest files are in the `dist` folder. You can modify this behavior by changing `parcelCleanPaths` in `package.json`.

[parcel-plugin-static-files](https://github.com/elwin013/parcel-plugin-static-files-copy#readme) is used to copy static files from `public` into the output directory and serve it. You can add additional paths by modifying `staticFiles` in `package.json`.

## License

[MIT License](https://github.com/ourcade/phaser3-typescript-parcel-template/blob/master/LICENSE)
