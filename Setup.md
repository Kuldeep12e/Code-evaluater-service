## How to setup a new Typescript Express project

1.
```
npm init -y
```
2.
```
npm install typscript

```
3.
```
tsc --init

```

Note : Make relevant config changes in tsconfig.js

4 .
```
 "scripts": {
    "build": "npx tsc",
    "watch": "npx tsc -w",
    "prestart": "npm run build",
    "start": "nodemon dist/index.js",
     "dev": "npx concurrently --kill-others \"npx tsc -w\" \"npx nodemon dist/index.js\""
  },

```

npm run dev
