[![NPM](https://img.shields.io/npm/v/@blackprint/nodes.svg)](https://www.npmjs.com/package/@blackprint/nodes)
[![Build Status](https://github.com/Blackprint/nodes/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/Blackprint/nodes/actions/workflows/build.yml)

# Blackprint Nodes
This repository contains a collection of general Blackprint Nodes.<br>
General nodes like:<br>
- Example (for cross language testing)
- Input (Button, Slider, etc)
- Data (String, Number, Boolean)
  - RegExp (match, replace, etc)
  - Math (Arithmetic, Geometry, Matrix, etc)
  - Comparator
- Decoration (Notes, other nodes only for browser UI)

General nodes can be compatible for different programming language, so it will not adding nodes for third-party library.

Nodes for specific library should have different repository instead.

If you used these nodes (before v1.0), please prepare for the breaking changes:
- Node name changes
- Port changes
- Interface changes (the UI or the API)

If you want to create your own node please use one of these template instead, it also contains some comments to help you get started.

- [Simplified JavaScript](https://github.com/Blackprint/template-js)
- TypeScript (Will be added soon)
- PHP (Will be added soon)
- Golang (Will be added soon)
- Python (Will be added soon)
- C# (Will be added soon)

## Build Blackprint nodes
If you're trying to build this repository, you can also clone this repository and put it in<br>
`https://github.com/Blackprint/Blackprint/tree/master/nodes`

You can also built the modules with `@blackprint/cli-tools`

```sh
$ npm i -g @blackprint/cli-tools
$ git clone --depth 1 https://github.com/Blackprint/nodes .
$ blackprint serve
```

After you run `blackprint serve`, the modules server will be running and you can connect to it from the [Blackprint Editor](https://blackprint.github.io) (development mode).

## Import this nodes from URL
Please specify the version to avoid breaking changes.

```js
Blackprint.loadModuleFromURL([
	'https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.8/dist/nodes-console.mjs',
	'https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.8/dist/nodes-data.mjs',
	'https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.8/dist/nodes-decoration.mjs',
	'https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.8/dist/nodes-example.mjs',
	'https://cdn.jsdelivr.net/npm/@blackprint/nodes@0.8/dist/nodes-input.mjs',
], {
	// Turn this on if you want to load .sf.js, and .sf.css
	// only with single .mjs
	loadBrowserInterface: true // set to "false" for Node.js/Deno
});
```

## Development URL
You can use this link to load unpublished nodes and still under development on GitHub.
https://cdn.jsdelivr.net/gh/Blackprint/nodes@dist/nodes-console.mjs
https://cdn.jsdelivr.net/gh/Blackprint/nodes@dist/nodes-data.mjs
https://cdn.jsdelivr.net/gh/Blackprint/nodes@dist/nodes-decoration.mjs
https://cdn.jsdelivr.net/gh/Blackprint/nodes@dist/nodes-example.mjs
https://cdn.jsdelivr.net/gh/Blackprint/nodes@dist/nodes-input.mjs

Replace `dist` with your latest commit hash (from `dist` branch) to avoid cache from CDN.