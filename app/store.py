from threading import Lock
from app.models import Idea, IdeaRequest

class IdeaStore:
    """Provided memory store. A fresh instance contains two seed ideas."""
    def __init__(self):
        self._lock = Lock()
        self._ideas = [
            Idea(id=1, title="Start a coding club", category="clubs"),
            Idea(id=2, title="Create a campus garden", category="environment"),
        ]
        self._next_id = 3

    def find_all(self) -> list[Idea]:
        with self._lock:
            return list(self._ideas)

    def add(self, request: IdeaRequest) -> Idea:
        with self._lock:
            idea = Idea(id=self._next_id, title=request.title, category=request.category)
            self._next_id += 1
            self._ideas.append(idea)
            return idea
