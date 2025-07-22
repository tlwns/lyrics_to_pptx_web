from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse
from lyrics.schemas import LyricsRequest
from lyrics.service import generate_pptx_in_memory

router = APIRouter()


@router.post("/generate")
async def generate_pptx(data: LyricsRequest):
    """Generate a PowerPoint presentation from the provided lyrics.

    Args:
        lyrics (str): The lyrics to be included in the PowerPoint slides.
        filename (str): Optional filename for the generated PowerPoint file.
        background_option (BackgroundOption): The background option for the slides.

    Returns:
        StreamingResponse: A response containing the generated PowerPoint file.
    """
    try:
        pptx_io = generate_pptx_in_memory(data.lyrics, data.background_option)
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
