const PlayerRepository = require('../../domain/player/PlayerRepository');
const pool = require('./pool');

class PlayerPgRepository extends PlayerRepository {
  async findAll({ page, limit, q, nationality, sort, order }) {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM players WHERE 1=1';
    const params = [];

    if (q) {
      params.push(`%${q}%`);
      query += ` AND name ILIKE $${params.length}`;
    }

    if (nationality) {
      params.push(nationality);
      query += ` AND nationality = $${params.length}`;
    }

    const allowedSort = ['name', 'nationality', 'club', 'position', 'created_at'];
    const sortField = allowedSort.includes(sort) ? sort : 'name';
    const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    query += ` ORDER BY ${sortField} ${sortOrder} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const { rows } = await pool.query(query, params);
    return rows.map(this._mapToDomain);
  }

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM players WHERE id = $1', [id]);
    return rows.length ? this._mapToDomain(rows[0]) : null;
  }

  async save(player) {
    const query = `
      INSERT INTO players (name, nationality, club, position, photo_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const params = [player.name, player.nationality, player.club, player.position, player.photoUrl];
    const { rows } = await pool.query(query, params);
    return this._mapToDomain(rows[0]);
  }

  async update(id, playerData) {
    const query = `
      UPDATE players
      SET name = $1, nationality = $2, club = $3, position = $4, photo_url = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *
    `;
    const params = [playerData.name, playerData.nationality, playerData.club, playerData.position, playerData.photoUrl, id];
    const { rows } = await pool.query(query, params);
    return this._mapToDomain(rows[0]);
  }

  async delete(id) {
    await pool.query('DELETE FROM players WHERE id = $1', [id]);
    return true;
  }

  _mapToDomain(row) {
    return {
      id: row.id,
      name: row.name,
      nationality: row.nationality,
      club: row.club,
      position: row.position,
      photoUrl: row.photo_url,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

module.exports = PlayerPgRepository;
