from pydantic import BaseModel
from enum import Enum


class BackgroundOption(str, Enum):
    NONE = "NONE"
    GIFT = "GIFT"
    CUSTOM = "CUSTOM"


class LyricsRequest(BaseModel):
    lyrics: str
    filename: str
    background_option: BackgroundOption
