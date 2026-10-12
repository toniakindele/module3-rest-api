# Module 3 REST APIs Python FastAPI track
Choose this track OR Java Spring Boot. The Module 2 React frontend connects in Phase 2.

## Setup and run
Use Python 3.10 or later. Recommended classroom version: Python 3.11 or 3.12.
Open the extracted folder containing requirements.txt. Create an isolated environment:

macOS or Linux:
```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --port 8080
```
Windows PowerShell:
```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --port 8080
```
If activation is restricted, use .venv\Scripts\python.exe directly for the pip, uvicorn,
and pytest commands; no execution-policy change is required.
Internet is needed to install dependencies. The requirements use compatible version ranges;
instructors can distribute a pinned freeze from a verified classroom environment.
Visit http://localhost:8080/api/hello. Stop with Ctrl+C and restart after edits.
Activate the environment in a second terminal, then run automated tests:

```sh
python -m pytest -v
```

## Files to edit
- app/main.py: TODO 1–5, greeting, route decorators, store calls, status 201.
- tests/test_store.py: two unit test templates, using IdeaStore directly.
- tests/test_api.py: POST API test using TestClient and a fresh app per test.
- SUBMISSION.md: evidence and reflection.
app/models.py supplies Pydantic models; app/store.py supplies temporary storage.
Python model type annotations tell FastAPI to read and validate the JSON body.
The supplied exception handler makes invalid JSON/input return 400 in both tracks.

## Shared Phase 1 assignment
1. Personalize GET /api/hello; keep its message key.
2. Complete GET /api/ideas: 200 with a JSON array, initially two seed ideas.
3. Complete POST /api/ideas: receive title/category JSON, store an idea, return 201 with id/title/category.
4. Verify blank fields and malformed JSON return 400 and do not change the list.
5. Complete two unit test TODOs: stored title/category and distinct ids for two new ideas.
6. Complete the POST API test TODO. Remove every required skip/disabled annotation and placeholder failure.
7. Import postman/Module3_Phase1.postman_collection.json into Postman and run requests 1–7 in order.
8. Restart the server and confirm GET returns only the two seed ideas again.
9. Complete SUBMISSION.md and submit your chosen project with evidence. Do one backend track only.

## Postman instructions
Import the collection JSON via Import > Files. Open the collection's Variables tab:
baseUrl is http://localhost:8080 for both tracks. Send requests in numbered order or use
Collection Runner. For a POST request inspect Body > raw > JSON and the Content-Type header.
Inspect the status, JSON response, and Test Results. The collection has assertions for valid
creation and unchanged data after invalid requests. These tests check a running API;
they do not replace unit tests. Do not send other POST requests between steps 4 and 7.
Restart behavior is a separate manual check. Expected errors are 400, regardless of track.

## Test expectations
The supplied seed-store unit test and greeting API test are complete examples.
The two unit test templates and one POST API test template are intentionally disabled/skipped.
The initial suite can pass while skipping work. Your final suite must have all required tests
enabled and passing. Unit tests construct IdeaStore directly; API tests exercise HTTP routing
and JSON through an in-process client. No live server is required for automated tests.

## Input and response contract
Request: {"title":"Start a robotics club","category":"clubs"}
Response after a fresh start: {"id":3,"title":"Start a robotics club","category":"clubs"}
Title and category must be nonblank; maximum lengths are 80 and 30 respectively.
The server assigns ids. A GET returns an array. No custom error body is required.
Missing mappings/decorators return 404; mapped placeholder handlers return 501.

## Troubleshooting
Connection refused: start the server and check baseUrl. 404: check route mapping and restart.
501: replace the handler placeholder. 405: check the method. 415: select JSON and its content type.
Java blank input accepted: check @Valid. Port busy: stop the other server; run only one track at a time.
If using a different port, change Postman's baseUrl and all other request URLs.
Python's usual validation status is 422; the supplied handler deliberately maps it to 400
for the shared classroom contract. Do not remove that handler.

## Scope and later phases
Phase 1: one API track, Postman checks, unit tests, an API test, and evidence.
Phase 2: connect the Module 2 React frontend using fetch; handle loading/errors and scoped CORS.
Phase 3: persistence and more operations. Memory data resets when the server restarts.
Suggested effort: 90–120 minutes after setup. Instructor supplies due date and collaboration policy.

## Official references
https://fastapi.tiangolo.com/tutorial/body/
https://fastapi.tiangolo.com/tutorial/testing/
https://fastapi.tiangolo.com/tutorial/body-fields/
