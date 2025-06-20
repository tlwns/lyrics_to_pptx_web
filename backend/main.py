from fastapi import FastAPI, HTTPException, status

app = FastAPI()


@app.post("/generate")
async def generate_pptx(lyrics: str, filename: str = ""):
    try:
        pass
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
