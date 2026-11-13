import os
import sqlite3
from contextlib import closing
from pathlib import Path
from threading import Lock
from app.models import Idea, IdeaRequest

class IdeaStore:
    """SQLite-backed store for ideas."""

    def _connect(self) -> sqlite3.Connection:
        path = Path(os.environ.get("DB_PATH", "data/ideas.db"))
        path.parent.mkdir(parents=True, exist_ok=True)
        conn = sqlite3.connect(path)
        conn.row_factory = sqlite3.Row
        return conn

    def find_all(self) -> list[Idea]:
        with closing(self._connect()) as conn:
            rows = conn.execute(
                "SELECT id, title, category FROM ideas ORDER BY id"
            ).fetchall()
            return [
                Idea(id=row["id"], title=row["title"], category=row["category"])
                for row in rows
            ]

    def add(self, request: IdeaRequest) -> Idea:
        with closing(self._connect()) as conn:
            cursor = conn.execute(
                "INSERT INTO ideas (title, category) VALUES (?, ?)",
                (request.title, request.category),
            )
            conn.commit()
            return Idea(
                id=cursor.lastrowid,
                title=request.title,
                category=request.category,
            )
            
    def delete(self, idea_id: int) -> bool:
        with closing(self._connect()) as conn:
            cursor = conn.execute(
                "DELETE FROM ideas WHERE id = ?",
                (idea_id,),
            )
            conn.commit()
            return cursor.rowcount > 0



""" 
class IdeaStore:
    #Provided memory store. A fresh instance contains two seed ideas.
    def __init__(self):
        self._lock = Lock()
        self._ideas = [
            Idea(id=1, title="Start a coding club", category="clubs"),
            Idea(id=2, title="Create a campus garden", category="environment"),
        ]
        self._next_id = 3

    def find_all(self) -> list[Idea]:
        with self._lock:
            return  list(self._ideas)

    def add(self, request: IdeaRequest) -> Idea:
        with self._lock:
            idea = Idea(id=self._next_id, title=request.title, category=request.category)
            self._next_id += 1
            self._ideas.append(idea)
            return idea
"""
