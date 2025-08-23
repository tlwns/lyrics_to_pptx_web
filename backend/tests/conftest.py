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
