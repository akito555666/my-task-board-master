DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS boards CASCADE;

-- boardsテーブル
CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- tasksテーブル
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    board_id INTEGER NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL DEFAULT '',
    icon VARCHAR(255) DEFAULT '',
    status_name VARCHAR(50) NOT NULL DEFAULT '',
    content TEXT DEFAULT '',
    task_order INTEGER DEFAULT 0
);

CREATE INDEX idx_tasks_board_status ON tasks(board_id, status_name);
