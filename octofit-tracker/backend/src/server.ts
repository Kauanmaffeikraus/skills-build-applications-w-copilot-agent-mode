const port = Number(process.env.PORT) || 8000;

// Build host for Codespaces if available, otherwise default to localhost
const codespaceName = process.env.CODESPACE_NAME;
const host = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

export { port, host, codespaceName };

export default { port, host, codespaceName };
