import re
from io import BytesIO

from pptx import Presentation
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt
from lyrics.utils import split_lyrics


def generate_pptx_in_memory(lyrics: str) -> BytesIO:
    """
    Generate a PowerPoint presentation in memory with the given lyrics.

    Args:
        lyrics (str): The lyrics to include in the PowerPoint slides.

    Returns:
        BytesIO: A BytesIO object containing the generated PowerPoint file.
    """
    if not lyrics.strip():
        raise ValueError("Lyrics cannot be empty")

    buffer = BytesIO()
    pres = build_pptx(lyrics)
    pres.save(buffer)
    buffer.seek(0)  # Reset the buffer position to the beginning
    return buffer


def build_pptx(lyrics: str, background_image=None) -> Presentation:
    """
    Build a PowerPoint presentation with the given lyrics.

    Args:
        lyrics (str): The lyrics to include in the PowerPoint slides.

    Returns:
        Presentation: A Presentation object containing the slides.
    """

    pres = Presentation()

    lyrics_sections = split_lyrics(lyrics)

    for section in lyrics_sections:
        if section == "////":
            # Add a black slide if new song is indicated by "////"
            slide = pres.slides.add_slide(pres.slide_layouts[5])
            if background_image:
                slide.shapes.add_picture(background_image, Inches(0), Inches(0),
                                         width=pres.slide_width, height=pres.slide_height)
            continue

        lines = [l for l in section.splitlines() if not re.match(
            r'https?://|^\d{1,2}/\d{1,2}/\d{2,4}|Verse\d*|Chorus|Tag|Prechorus|Bridge',
            l)]

        parts = [lines] if len(lines) <= 5 else [
            lines[:len(lines)//2], lines[len(lines)//2:]]

        for part in parts:
            slide = pres.slides.add_slide(pres.slide_layouts[6])
            if background_image:
                slide.shapes.add_picture(background_image, Inches(0), Inches(0),
                                         width=pres.slide_width, height=pres.slide_height)

            box = slide.shapes.add_textbox(
                Inches(2), Inches(2), Inches(9.5), Inches(5))
            frame = box.text_frame
            for line in part:
                para = frame.add_paragraph()
                para.text = line
                para.alignment = PP_ALIGN.CENTER
                para.font.size = Pt(44)

    # Add a final slide with no content
    pres.slides.add_slide(pres.slide_layouts[5])
    if background_image:
        pres.slides[-1].shapes.add_picture(background_image, Inches(0), Inches(0),
                                           width=pres.slide_width, height=pres.slide_height)

    return pres
