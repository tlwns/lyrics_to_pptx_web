"""
Schemas for lyrics module.
"""

from enum import Enum

from pydantic import BaseModel


class BackgroundOption(str, Enum):
    """
    Enum representing the background options for PowerPoint slides.
    """
    NONE = "NONE"
    GIFT = "GIFT"
    CUSTOM = "CUSTOM"


class LyricsRequest(BaseModel):
    """
    Request data model for PowerPoint generation from lyrics.
    """
    lyrics: str
    filename: str
    background_option: BackgroundOption
