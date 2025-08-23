"""
Fixtures for testing.
"""

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="session")
def client():
    """
    Fixture for the FastAPI test client.
    """
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(scope="function")
def json_data(lyrics, filename, background_option):
    """
    Fixture for JSON data used in tests.
    """
    return {
        "lyrics": lyrics,
        "filename": filename,
        "background_option": background_option
    }
