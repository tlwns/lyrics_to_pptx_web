# Frontend Design (Next.js)

## Pages

- `/`: Main lyrics form

## Form Logic

- Uses `react-hook-form` for form handling
- Form fields:
- `lyrics`: Textarea for raw lyrics input
- `filename`: Input for desired PPTX filename
- `submit`: Button to submit the form
- On submit:
  - Creates a `FormData` object
  - Sends to FastAPI via `fetch()`
  - Converts response to a Blob and triggers download

## Optional Enhancements

- Show preview of slides before download
  - Hence, the use of a controlled form
- Track download progress
