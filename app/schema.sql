CREATE TABLE IF NOT EXISTS ideas (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL CHECK(length(trim(title)) > 0),
    category TEXT NOT NULL CHECK(length(trim(category)) > 0)
);
