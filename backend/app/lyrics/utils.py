"""
Utility functions for processing lyrics.
"""
import re


def split_lyrics(lyrics: str) -> list[str]:
    """
    Split lyrics into sections based on common patterns. 

    This function identifies sections like verses, choruses, bridges, and tags, 
    and cleans up the text by removing empty lines and invisible characters.

    Args:
        lyrics (str): The lyrics to be split.
    Returns:
        list[str]: A list of cleaned sections of lyrics.
    """
    lyrics = lyrics.replace('\u200b', '')

    pattern = (
        r'^.*\b(?:Verse|Tag|Pre-Chorus|Prechorus|Chorus|Bridge|Interlude)\d*\b.*$'
        r'|^(\s*////\s*)$'
        r'|\n\s*\n'
    )

    sections = re.split(
        pattern,
        lyrics,
        flags=re.IGNORECASE | re.MULTILINE,
    )

    cleaned = [s.strip() for s in sections if s]
    return cleaned
