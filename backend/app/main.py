import uvicorn
from fastapi import FastAPI, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from fastapi.responses import StreamingResponse
from lyrics.service import generate_pptx_in_memory


class LyricsRequest(BaseModel):
    lyrics: str
    filename: str = "lyrics"


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


@app.post("/generate")
async def generate_pptx(data: LyricsRequest = Body(...)):
    """Generate a PowerPoint presentation from the provided lyrics.

    Args:
        lyrics (str): The lyrics to be included in the PowerPoint slides.
        filename (str): Optional filename for the generated PowerPoint file.

    Returns:
        StreamingResponse: A response containing the generated PowerPoint file.
    """
    try:
        pptx_io = generate_pptx_in_memory(data.lyrics)
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

    return StreamingResponse(
        pptx_io,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
        headers={
            "Content-Disposition": f"attachment; filename={data.filename or 'lyrics.pptx'}"}
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
