# vue-test-assignment

This template should help get you started developing with Vue 3 in Vite.

## Task

Get the data from the data.json file and display it on the page as shown in fig. "Example.png":

![Example.png](./src/assets//task/Example.png)

The parameters shown in the figure are located in the Goods node. "C" - price in dollars (USD) - display in rubles (choose the exchange rate arbitrarily), "G" - group id, "T" - product id, "P" - how many units of the product are left (the parameter that is indicated in brackets in name).

Group and product id mappings to their names are in the names.json file.

After the data is output, add handlers to add the selected item to the cart and remove it from it. An example of a shopping cart is shown in the "Cart.png" file:

![Cart.png](./src/assets//task/Cart.png)

Make a calculation of the total amount of goods and output as a separate field.
The shopping cart is on the same page as the list of products.

Output data using a binding to the view and the possibility of subsequent changes (two-way binding). You can use frameworks.
Make an update of the price of the goods depending on the exchange rate.

At intervals of 15 seconds, read the original data.json file and at the same time change the dollar rate (manually) to a value from 20 to 80, updating the data in the model (with a change in the view). If the price has increased upwards, highlight the cell in red, if it has increased downwards, in green.

Additional Information: The designs shown in the examples are optional.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Run json-sever separately

```sh
json-server --watch src/db/db.json --port 4001
```
