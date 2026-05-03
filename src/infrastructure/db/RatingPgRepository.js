const RatingRepository = require('../../domain/rating/RatingRepository');
const pool = require('./pool');

class RatingPgRepository extends RatingRepository {
  async save(rating) {
    const query = `
      INSERT INTO ratings (nomination_id, score, comment)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const params = [rating.nominationId, rating.score, rating.comment];
    const { rows } = await pool.query(query, params);
    return this._mapToDomain(rows[0]);
  }

  async getAverageByNomination(nominationId) {
    const query = 'SELECT AVG(score) as average FROM ratings WHERE nomination_id = $1';
    const { rows } = await pool.query(query, [nominationId]);
    return rows[0].average ? parseFloat(rows[0].average) : 0;
  }

  async getAllByNomination(nominationId) {
    const query = 'SELECT * FROM ratings WHERE nomination_id = $1 ORDER BY created_at DESC';
    const { rows } = await pool.query(query, [nominationId]);
    return rows.map(this._mapToDomain);
  }

  _mapToDomain(row) {
    return {
      id: row.id,
      nominationId: row.nomination_id,
      score: row.score,
      comment: row.comment,
      createdAt: row.created_at
    };
  }
}

module.exports = RatingPgRepository;
