CREATE TABLE IF NOT EXISTS reservations (
  id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  language TEXT NOT NULL DEFAULT 'zh',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS reservations_email_created ON reservations(email, created_at);
