from pydantic import BaseModel


class LyricsRequest(BaseModel):
    lyrics: str
    filename: str = "lyrics"
