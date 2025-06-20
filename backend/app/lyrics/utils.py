import re


def split_lyrics(lyrics: str) -> list[str]:
    """
    Split lyrics into sections based on common patterns. This function identifies sections like verses, choruses, bridges, and tags, and cleans up the text by removing empty lines and invisible characters.

    Args:
        lyrics (str): The lyrics to be split.
    Returns:
        list[str]: A list of cleaned sections of lyrics.
    """
    lyrics = lyrics.replace('\u200b', '')
    sections = re.split(
        r'(?=Verse\d*|Tag|Chorus|Bridge|Prechorus|\n\s*\n|////)',
        lyrics,
        flags=re.IGNORECASE
    )
    cleaned = [s.strip() for s in sections if s.strip()]
    cleaned = [s for s in cleaned if not re.match(r'\w+.com', s)]
    return cleaned
