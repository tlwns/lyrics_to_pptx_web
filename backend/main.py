from fastapi import FastAPI, HTTPException, status, responses
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


@app.post("/generate")
async def generate_pptx(lyrics: str, filename: str = ""):
    try:
        file_path = "generated_presentation.pptx"
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        ) from e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred: " + str(e)
        ) from e

    return responses.FileResponse(
        path=file_path,
        filename=filename if filename else "default.pptx",
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation"
    )
