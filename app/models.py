from pydantic import BaseModel, ConfigDict, Field

class IdeaRequest(BaseModel):
    # Trim whitespace before checking lengths: a whitespace-only value is invalid.
    model_config = ConfigDict(str_strip_whitespace=True)
    title: str = Field(min_length=1, max_length=80)
    category: str = Field(min_length=1, max_length=30)

class Idea(BaseModel):
    model_config = ConfigDict(frozen=True)
    id: int
    title: str
    category: str
