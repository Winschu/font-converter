# webfont-converter

This package can be used to convert a TTF file into a WOFF and WOFF2 file at once

# usage

#### Install with yarn

```c
yarn global add webfont-converter --dev
```

#### Install with npm

```c
npm install -g webfont-converter --dev
```

### usage example

```c
webfont-converter --path=./fontpath
```

or

```c
webfont-converter --p=./fontpath
```

# TODO

- [ ] option to only convert a single file and not the whole directory
- [ ] creating css code output of converted files
- [x] already existing files don't have to be removed manually
- [x] adding check on missing trailing slash