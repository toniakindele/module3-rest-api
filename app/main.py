from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from app.models import Idea, IdeaRequest
from app.store import IdeaStore

def create_app() -> FastAPI:
    app = FastAPI(title="Campus Idea Board")
    store = IdeaStore()  # Fresh store per app; test clients can be isolated.

    # FastAPI normally uses 422 for validation errors. We supply this handler
    # so both classroom tracks use the same 400 error contract.
    @app.exception_handler(RequestValidationError)
    async def invalid_request(request: Request, error: RequestValidationError):
        return JSONResponse(status_code=400, content={"message": "Invalid request"})

    @app.get("/api/hello")
    def hello():
        # TODO 1: Personalize the message; keep the "message" key.
        return {"message": "Hello, Toni Akindele. Welcome to my Campus Idea Board!"}

    # TODO 2: Add the GET route decorator for /api/ideas.
    @app.get("/api/ideas")
    def get_ideas() -> list[Idea]:
        # TODO 3: Return the store's read method result.
        # raise HTTPException(status_code=501, detail="Complete TODO 3")
        return store.find_all()

    # TODO 4: Add the POST route decorator for /api/ideas with status_code=201.
    @app.post("/api/ideas", status_code = 201)
    def create_idea(request: IdeaRequest) -> Idea:
        # The supplied type annotation tells FastAPI to read and validate JSON.
        # TODO 5: Return the idea created by the store's add method.
        # raise HTTPException(status_code=501, detail="Complete TODO 5")
        return store.add(request)

    return app

app = create_app()
