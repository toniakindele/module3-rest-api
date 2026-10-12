# Phase 1 submission
Name:
Course or section:
INEW-2434-Advanced Web Programming / Python FastAPI


## My campus idea
In this assignment I have built a simple Campus Idea Board API using Python FastAPI. It uses GET requests to retrieve information and POST requests to submit data.

## Evidence log
Record method, URL, status, and response. Attach screenshots or paste terminal output.
1. Personalized GET /api/hello: 
see screenshot folder - personalized-hello.png

2. GET /api/ideas before creating: 
see screenshot folder - test-a.png

3. Valid POST /api/ideas: 
see screenshot folder - test-b.png

4. GET /api/ideas after creating: 
see screenshot folder - test-c.png

5. Blank title POST (400) and unchanged list: 
see screenshot folder - test-d.png

6. Malformed JSON POST (400): 
see screenshot folder - bad-syntax.png

7. Restart the server and GET /api/ideas (two seed ideas again): 
see screenshot folder - restart.png

## Reflection
1. What does a controller do?
A controller receives HTTP requests and unpacks the data. It packages the result back up (JSON) and sends it back yo the user with the correct HTTP status codes.

2. How is GET different from POST?
GET retrieves data from the server while POST submits data to the server.

3. How do JSON title and category become Java data?
Through "Deserialization": Postman sends the data through the network as a raw text string formatted like JSON. When the controller receives the payload, a framework library is executed. The library scans the Java class and looks for matching field names then it instatiates it. 

4. Why does our added idea disappear after restarting?
The idea disappears because the IdeaStore is using in-memory data structure that is wiped out when the application server is restarted.

5. What would the React frontend need to know to use this API?
It would need to know where the backend is hosted, the exact paths, whether to use GET or POST and the body schema.

## Debugging story
Symptom, hypothesis, change, and observed result:
Didn't have much debugging to do as this assignment was pretty straight forward. Initially the server returned a 501 Not Implemented error as I had not replaced the placeholders - added @app.get("/api/ideas") and @app.post("/api/ideas", status_code = 201) routing decorators.

## Assistance disclosure
People, documentation, or AI tools consulted; what I verified myself:
Consulted https://fastapi.tiangolo.com/tutorial/testing/#extended-testing-file and https://www.youtube.com/watch?v=EgpLj86ZHFQ&t=105s for help with the testing as I was unfamiliar with assertsion in Python.

## Automated test evidence
Command and summary:
python -m pytest -v
5 tests total yielding 100% success rate

Two completed unit tests (names and assertions):
1. test_adding_idea_stores_title_and_category
        assert created_idea.title == "Start a coding club"
        assert created_idea.category == "clubs"
        assert hasattr(created_idea, "id")
2. test_two_new_ideas_receive_different_ids
        assert idea1.id != idea2.id
        assert idea1.id not in seed_ids
        assert idea2.id not in seed_ids
        assert len(store.find_all()) == 4

Completed POST API test (name and assertions):
1. test_valid_post_returns_created_idea
        assert created_idea.title == "Start a coding club"
        assert created_idea.category == "clubs"
        assert hasattr(created_idea, "id")
        assert "id" in data
        assert data["title"] == payload["title"]
        assert data["category"] == payload["category"]

Explain why unit tests differ from Postman requests:
UNIT TESTS
Unit tests target low-level blocks of code completely in memory. They require no running servers or live ports and catch bugs instantly during local changes.
POSTMAN
Postman requests test the high-level stack by sending acutal network packets over HTTP ports. It requires a fully operational, running application server. It's more of an interactive tool.

Confirm no required test is skipped or disabled:
see screenshot folder - automated-tests.png

