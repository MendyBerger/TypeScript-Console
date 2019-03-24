# Rebuild from source

## Third party library
There is one third party library (typescript compiler) included in this extension, the original file can be found [here](https://github.com/Microsoft/TypeScript/blob/v3.3.4000/lib/typescript.js).

This file is minified with uglifyjs, to reproduce download the file into the src directory and run:
- `uglifyjs --output src/typescript.min.js src/typescript.js`