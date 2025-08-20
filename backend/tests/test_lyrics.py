"""
Test suite for the lyrics module.
"""
from fastapi.testclient import TestClient
from fastapi import status
from app.main import app

# Status codes
VALUE_ERROR = status.HTTP_400_BAD_REQUEST

client = TestClient(app)


def test_generate_empty_lyrics():
    """Test generating a PowerPoint with empty lyrics."""
    response = client.post(
        "/generate",
        json={
            "lyrics": "",
            "filename": "test_lyrics",
            "background_option": "NONE"
        }
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"detail": "Lyrics cannot be empty."}


def test_generate_empty_filename():
    """Test generating a PowerPoint with empty filename."""
    response = client.post(
        "/generate",
        json={
            "lyrics": "Sample lyrics",
            "filename": "",
            "background_option": "NONE"
        }
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.headers["Content-Disposition"] == "attachment; filename=lyrics.pptx"
    assert response.headers["Content-Type"] == (
        "application/vnd.openxmlformats-officedocument."
        "presentationml.presentation"
    )


def test_generate_invalid_background_option():
    """Test generating a PowerPoint with an invalid background option."""
    response = client.post(
        "/generate",
        json={
            "lyrics": "Sample lyrics",
            "filename": "test_lyrics",
            "background_option": "INVALID_OPTION"
        }
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_generate_valid_lyrics():
    """Test generating a PowerPoint with valid lyrics."""
    response = client.post(
        "/generate",
        json={
            "lyrics": "Sample lyrics",
            "filename": "test_lyrics",
            "background_option": "NONE"
        }
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.headers["Content-Disposition"] == "attachment; filename=test_lyrics"
    assert response.headers["Content-Type"] == (
        "application/vnd.openxmlformats-officedocument."
        "presentationml.presentation"
    )
