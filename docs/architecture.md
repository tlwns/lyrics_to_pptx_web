# System Architecture

## Overview

This app converts raw lyrics into PowerPoint files for presentation purposes.

### Tech Stack

- **Frontend**: Next.js (React, TypeScript, fetch-based form submission)
- **Backend**: FastAPI (Python), handles PPTX generation and download
- **PPTX**: [`python-pptx`](https://python-pptx.readthedocs.io/en/latest/)
- **Hosting**: (Planned) Vercel for frontend, Render/Fly.io for backend

## Application Flow

1. User submits lyrics via frontend
2. Next.js sends lyrics + filename to FastAPI
3. FastAPI generates `.pptx` and returns it as a downloadable file
