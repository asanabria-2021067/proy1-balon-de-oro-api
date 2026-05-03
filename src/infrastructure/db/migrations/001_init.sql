CREATE TABLE players (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  nationality  VARCHAR(100) NOT NULL,
  club         VARCHAR(100) NOT NULL,
  position     VARCHAR(5)   NOT NULL CHECK (position IN ('GK','DEF','MID','FWD')),
  photo_url    TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ceremonies (
  id         SERIAL PRIMARY KEY,
  year       SMALLINT UNIQUE NOT NULL,
  winner_id  INTEGER NOT NULL REFERENCES players(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE nominations (
  id              SERIAL PRIMARY KEY,
  ceremony_id     INTEGER NOT NULL REFERENCES ceremonies(id) ON DELETE CASCADE,
  player_id       INTEGER NOT NULL REFERENCES players(id),
  rank            SMALLINT NOT NULL CHECK (rank BETWEEN 1 AND 10),
  votes_received  INTEGER DEFAULT 0,
  UNIQUE (ceremony_id, rank),
  UNIQUE (ceremony_id, player_id)
);

CREATE TABLE ratings (
  id             SERIAL PRIMARY KEY,
  nomination_id  INTEGER NOT NULL REFERENCES nominations(id) ON DELETE CASCADE,
  score          SMALLINT NOT NULL CHECK (score BETWEEN 1 AND 5),
  comment        TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
