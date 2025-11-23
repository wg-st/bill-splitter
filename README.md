# Bill Splitter

A single page application (SPA) to split grocery shopping bills among friends.

**Website**: [https://wg-st.github.io/bill-splitter/](https://wg-st.github.io/bill-splitter/)

## Toolchain

- [React](https://react.dev/): (SPA framework)
- [React Router](https://reactrouter.com/) (library for routing in react)
- [Vite](https://vite.dev/) (build tool)
- [Tailwind](https://tailwindcss.com/) (CSS framework)
- [ESLint](https://eslint.org/) (linter)
- [Vitest](https://vitest.dev/) (testing framework)
- [Dependabot](https://github.com/dependabot/dependabot-core) (automatic dependency updates)
- [CodeQL](https://codeql.github.com/) (code scanning and security analysis)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Testing

Run the test suite:

```bash
npm test
```

Run tests with interactive UI:

```bash
npm run test:ui
```

Generate coverage reports:

```bash
npm run test:coverage
```

View test coverage in your browser by opening `coverage/index.html` after running coverage.

### Linting & Type Checking

Check for linting issues:

```bash
npm run lint
```

Run TypeScript type checking:

```bash
npm run typecheck
```

## Building for Production & Deployment

The app is deployed with a [GitHub Action](.github/workflows/deploy.yml) on pushes to the main branch.

You can also create production builds manually:

```bash
npm run build
```
