# API Reference

## `POST /generate`

### Description

Generates a `.pptx` file from provided lyrics.

### Request (form data)

| Field    | Type   | Required | Description                 |
| -------- | ------ | -------- | --------------------------- |
| lyrics   | string | ✅       | Raw lyrics text             |
| filename | string | ❌       | Optional file name (no ext) |

### Response

- `200 OK`: Returns `.pptx` file
- `400`: Invalid input (e.g., empty lyrics)

### Example (curl)

```bash
curl -X POST -F "lyrics=Hello world\nChorus" -F "filename=test" http://localhost:8000/generate --output test.pptx
```
