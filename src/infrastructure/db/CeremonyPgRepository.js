const CeremonyRepository = require('../../domain/ceremony/CeremonyRepository');
const pool = require('./pool');

class CeremonyPgRepository extends CeremonyRepository {
  async findAll() {
    const query = `
      SELECT c.*, p.name as winner_name, p.photo_url as winner_photo_url, p.nationality as winner_nationality, p.club as winner_club, p.position as winner_position
      FROM ceremonies c
      JOIN players p ON c.winner_id = p.id
      ORDER BY c.year DESC
    `;
    const { rows } = await pool.query(query);
    return rows.map(this._mapToDomainWithPlayer);
  }

  async findByYear(year) {
    const query = `
      SELECT c.*, p.name as winner_name, p.photo_url as winner_photo_url, p.nationality as winner_nationality, p.club as winner_club, p.position as winner_position
      FROM ceremonies c
      JOIN players p ON c.winner_id = p.id
      WHERE c.year = $1
    `;
    const { rows } = await pool.query(query, [year]);
    return rows.length ? this._mapToDomainWithPlayer(rows[0]) : null;
  }

  async save(ceremony) {
    const query = 'INSERT INTO ceremonies (year, winner_id) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [ceremony.year, ceremony.winnerId]);
    return this._mapToDomain(rows[0]);
  }

  async update(year, ceremonyData) {
    const query = 'UPDATE ceremonies SET winner_id = $1 WHERE year = $2 RETURNING *';
    const { rows } = await pool.query(query, [ceremonyData.winnerId, year]);
    return this._mapToDomain(rows[0]);
  }

  async delete(year) {
    await pool.query('DELETE FROM ceremonies WHERE year = $1', [year]);
    return true;
  }

  _mapToDomain(row) {
    return {
      id: row.id,
      year: row.year,
      winnerId: row.winner_id,
      createdAt: row.created_at
    };
  }

  _mapToDomainWithPlayer(row) {
    return {
      id: row.id,
      year: row.year,
      winnerId: row.winner_id,
      createdAt: row.created_at,
      winner: {
        id: row.winner_id,
        name: row.winner_name,
        photoUrl: row.winner_photo_url,
        nationality: row.winner_nationality,
        club: row.winner_club,
        position: row.winner_position
      }
    };
  }
}

module.exports = CeremonyPgRepository;
