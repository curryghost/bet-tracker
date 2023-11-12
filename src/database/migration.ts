import { db } from "./database";

const up = () => {
  const query = db.query(
    "CREATE TABLE IF NOT EXISTS bets (id TEXT PRIMARY KEY, match_id INTERGER, stake INTERGER, odds INTERGER, created_at TEXT, updated_at TEXT)",
  );

  query.run();
};

const down = () => {
  const query = db.query("DROP TABLE IF EXISTS bets");

  query.run();
};

const args = process.argv.slice(2);

if (args[0] === "down") {
  down();
} else {
  up();
}
