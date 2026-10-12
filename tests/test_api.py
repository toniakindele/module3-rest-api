import pytest
from fastapi.testclient import TestClient
from app.main import create_app

@pytest.fixture
def client():
    # Each test gets its own application and memory store.
    with TestClient(create_app()) as test_client:
        yield test_client

def test_greeting_returns_json(client):
    response = client.get("/api/hello")
    assert response.status_code == 200
    assert isinstance(response.json()["message"], str)

# @pytest.mark.skip(reason="TODO: write assertions and remove this skip decorator")
def test_valid_post_returns_created_idea(client):
    # Send client.post("/api/ideas", json={"title": ..., "category": ...}).
    # Assert 201 and check response.json() id, title, and category.
    # raise AssertionError("Complete this test")
    payload = {
        "title": "Start a coding club",
        "category": "clubs"
    }

    response = client.post("/api/ideas", json = payload)

    assert response.status_code == 201

    data = response.json()
    assert "id" in data
    assert data["title"] == payload["title"]
    assert data["category"] == payload["category"]

