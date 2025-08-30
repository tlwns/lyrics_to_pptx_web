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
    lyrics = lyrics.replace("\u200b", "")

    pattern = (
        r"^.*\b(?:Intro|Verse|Tag|Pre-Chorus|Prechorus|Chorus|Bridge|Interlude)\d*\b.*$"
        r"|^(\s*////\s*)$"
        r"|\n\s*\n"
    )

    sections = re.split(
        pattern,
        lyrics,
        flags=re.IGNORECASE | re.MULTILINE,
    )

    cleaned = [s.strip() for s in sections if s]
    return cleaned


def split_lines(lines):
    """
    Recursively split lines into smaller parts.
    Until each part is a maximum of 5 lines.
    """

    if len(lines) <= 5:
        return [lines]

    mid = len(lines) // 2

    left = split_lines(lines[:mid])
    right = split_lines(lines[mid:])

    return left + right


def is_hangul(line):
    """
    Check if a line contains Hangul characters.
    """
    hangul_pattern = re.compile(r"[\uAC00-\uD7A3]+")
    return bool(hangul_pattern.search(line))
