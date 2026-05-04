const StatsRepositoryPort = require('../../domain/stats/StatsRepository');
const pool = require('./pool');

class StatsRepository extends StatsRepositoryPort {
  async getCountryStats() {
    const query = `
      SELECT
        p.nationality AS country,
        COUNT(c.id) AS wins,
        COUNT(DISTINCT p.id) AS players
      FROM ceremonies c
      JOIN players p ON p.id = c.winner_id
      GROUP BY p.nationality
      ORDER BY wins DESC, country ASC
    `;

    const { rows } = await pool.query(query);

    return rows.map(row => ({
      country: row.country,
      wins: parseInt(row.wins),
      players: parseInt(row.players)
    }));
  }
}

module.exports = StatsRepository;
