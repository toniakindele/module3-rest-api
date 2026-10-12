import pytest
from app.models import IdeaRequest
from app.store import IdeaStore

def test_fresh_store_contains_two_seed_ideas():
    # A unit test: no web server or HTTP client.
    store = IdeaStore()
    assert len(store.find_all()) == 2

# @pytest.mark.skip(reason="TODO: write assertions and remove this skip decorator")
def test_adding_idea_stores_title_and_category():
    # Arrange: fresh store and IdeaRequest.
    store = IdeaStore()
    request = IdeaRequest(title = "Start a coding club", category = "clubs")

    # Act: call add(request).
    created_idea = store.add(request)
    # Assert: returned title/category and find_all contains the idea.
    # raise AssertionError("Complete this test")
    assert created_idea.title == "Start a coding club"
    assert created_idea.category == "clubs"
    assert hasattr(created_idea, "id")

    all_ideas = store.find_all()
    assert len(all_ideas) == 3
    assert any(idea.id == created_idea.id for idea in all_ideas)

#@pytest.mark.skip(reason="TODO: write assertions and remove this skip decorator")
def test_two_new_ideas_receive_different_ids():
    # Arrange: fresh store. 
    store = IdeaStore()
    req1 = IdeaRequest(title = "Idea One", category = "Test")
    req2 = IdeaRequest(title = "Idea Two", category = "Test")
    # Act: add two requests.
    idea1 = store.add(req1)
    idea2 = store.add(req2)
    # Assert: ids differ, do not reuse seed ids, list size is four.
    # raise AssertionError("Complete this test")
    assert idea1.id != idea2.id

    seed_ideas = IdeaStore().find_all()
    seed_ids = {idea.id for idea in seed_ideas}

    assert idea1.id not in seed_ids
    assert idea2.id not in seed_ids

    assert len(store.find_all()) == 4
