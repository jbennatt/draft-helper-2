# Install Dependencies

```shell
npm install -g pnpm
pnpm i
```

# Build Site

_These commands `npm run` `build`/`start`/`dev` are defined in package.json. They actually call `next` commands._

```shell
npm run build
```

This outputs the static site to the `out` file in root directory.

Simply copy all files to S3 location. E.g. if site is called: _jaredbennatt.com/draft-helper2_, then place all of these files into the S3 folder: _jaredbennatt.com/draft-helper2_ (so that index.html is served when looking at this address).

# Debug Locally

_Note: axios call will not work locally (XCOR) and will need to temporarily modify to use static json sample file_

```shell
npm run start
```

or alternatively

```shell
npm run dev
```