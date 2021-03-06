### Hexlet tests and linter status:

[![Actions Status](https://github.com/Semeikin-Kirill/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Semeikin-Kirill/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/3f12f3ac21566fb467fd/maintainability)](https://codeclimate.com/github/Semeikin-Kirill/frontend-project-lvl2/maintainability)
[![Node CI](https://github.com/Semeikin-Kirill/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Semeikin-Kirill/frontend-project-lvl2/actions/workflows/nodejs.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3f12f3ac21566fb467fd/test_coverage)](https://codeclimate.com/github/Semeikin-Kirill/frontend-project-lvl2/test_coverage)

## Difference calculator

### Setup

```
$ make install
```

### Comparison of flat files (JSON)

```
$ gendiff <filepath1> <filepath2>
```

[![asciicast](https://asciinema.org/a/pEWUDEcmTkzrFEjQw3j3OOtxG.svg)](https://asciinema.org/a/pEWUDEcmTkzrFEjQw3j3OOtxG)

### Comparison of flat files (YAML)

```
$ gendiff <filepath1> <filepath2>
```

[![asciicast](https://asciinema.org/a/tATx8ZBpejM30acmHZtl0SBV6.svg)](https://asciinema.org/a/tATx8ZBpejM30acmHZtl0SBV6)

### Nested structure comparison (JSON and YAML)

[![asciicast](https://asciinema.org/a/iWpDbiI1ZvQv8NZaUVuJXGLIH.svg)](https://asciinema.org/a/iWpDbiI1ZvQv8NZaUVuJXGLIH)

### Flat format

```
$ gendiff --format plain <filepath1> <filepath2>
```

[![asciicast](https://asciinema.org/a/E3BWuuJR4nkEpZ8Cg3kIMhIor.svg)](https://asciinema.org/a/E3BWuuJR4nkEpZ8Cg3kIMhIor)

### Get the differences in json format

```
$ gendiff -- format json <filepath1> <filepath2>
```

[![asciicast](https://asciinema.org/a/wyC0TMDSunJckdaaJKsgwlcjC.svg)](https://asciinema.org/a/wyC0TMDSunJckdaaJKsgwlcjC)
