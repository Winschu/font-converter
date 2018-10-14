# webfont-converter

This package can be used to convert a TTF file into a EOT, SVG, WOFF and WOFF2 file at once

# usage

#### Install with yarn

```
yarn global add webfont-converter --dev
```

#### Install with npm

```
npm install -g webfont-converter --dev
```

### usage example

```
webfont-converter ./fontpath/
```

Note: currently the trailing slash is needed

# TODO

- [ ] already existing files don't have to be removed manually
- [ ] adding check on missing trailing slash
- [ ] option to only convert a single file and not the whole directory