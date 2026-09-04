# OctoFit Tracker frontend

Run the presentation tier with:

```bash
npm run dev
```

The frontend reads `VITE_CODESPACE_NAME` through `import.meta.env` to build the Codespaces API URL:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[resource]/
```

Define it in `.env.local` when running in a GitHub Codespace:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

When the variable is unset, the app safely falls back to `http://localhost:8000` for local backend development.
