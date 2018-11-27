Welcome to the TypeScript-Console wiki!

## Running TypeScript from a .ts file

you can run TypeScript from a `.ts` file in the browser by adding `type='text/typescript'` attribute to the script tag that is loading the `.ts` file, like so:

```html
<script src='./main.ts' type='text/typescript'></script>
```
Or even run inline TypeScript, like so:

```html
<script type='text/typescript'>
    let str: string = 'some string';
    console.log(str);
</script>
```

## Running via the TS-Console

To open the console press F12 to open Developer Tools and look for a tab named 'TS-Console' you can just type in TypeScript code and see it executing right away 

Note: All errors and logs will apear in the regular JavaScript console and not in the TS-Console. this is by design so that you have all your logs and errors in the same place.
