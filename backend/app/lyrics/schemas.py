from pydantic import BaseModel
from enum import Enum


class BackgroundOption(str, Enum):
    NONE = "none"
    GIFT = "GIFT"
    IMAGE = "image"


class LyricsRequest(BaseModel):
    lyrics: str
    filename: str
    background_option: BackgroundOption
