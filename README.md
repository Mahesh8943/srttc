# srttc

## Anthropic proxy endpoint

A serverless proxy is available at `api/generate.js` to call Anthropic securely from the backend and avoid browser CORS issues. It forwards the request body to `https://api.anthropic.com/v1/messages`, adds the required headers, and responds with the JSON from Anthropic. It also answers `OPTIONS` preflight requests and sets permissive CORS headers for client requests.

### Environment variable

Set a secret env var named `ANTHROPIC_API_KEY` (without the `REACT_APP_` prefix) in your hosting environment. This value is only read server-side by the proxy.

### Frontend usage

From the client, send a `POST` to `/api/generate` with your Anthropic message payload. Do not call the Anthropic API directly from the browser or expose the API key.
