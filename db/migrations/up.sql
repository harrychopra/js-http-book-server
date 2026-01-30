CREATE TABLE authors (
    id serial PRIMARY key,
    full_name text NOT NULL,
    fun_fact text NOT NULL
);

CREATE TABLE books (
    id serial PRIMARY key,
    title text NOT NULL,
    author_id int NOT NULL REFERENCES authors (id) ON DELETE cascade,
    is_fiction bool NOT NULL
);

CREATE index idx_books_author_id ON books (author_id);
