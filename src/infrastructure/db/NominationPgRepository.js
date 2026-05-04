const NominationRepository = require('../../domain/nomination/NominationRepository');
const pool = require('./pool');
const CloudinaryHelper = require('../cloudinary/cloudinaryHelper');

class NominationPgRepository extends NominationRepository {
  async findByCeremony(ceremonyId) {
    const query = `
      SELECT n.*, p.name as player_name, p.photo_url as player_photo_url, p.nationality as player_nationality, p.club as player_club, p.position as player_position
      FROM nominations n
      JOIN players p ON n.player_id = p.id
      WHERE n.ceremony_id = $1
      ORDER BY n.rank ASC
    `;
    const { rows } = await pool.query(query, [ceremonyId]);
    return rows.map(this._mapToDomainWithPlayer);
  }

  async findByPlayer(playerId) {
    const query = `
      SELECT n.*, c.year
      FROM nominations n
      JOIN ceremonies c ON n.ceremony_id = c.id
      WHERE n.player_id = $1
      ORDER BY c.year DESC
    `;
    const { rows } = await pool.query(query, [playerId]);
    return rows.map(row => ({
      id: row.id,
      ceremonyId: row.ceremony_id,
      playerId: row.player_id,
      rank: row.rank,
      votesReceived: row.votes_received,
      year: row.year
    }));
  }

  async findByYear(year) {
    const query = `
      SELECT n.*, p.name as player_name, p.photo_url as player_photo_url, p.nationality as player_nationality, p.club as player_club, p.position as player_position
      FROM nominations n
      JOIN ceremonies c ON n.ceremony_id = c.id
      JOIN players p ON n.player_id = p.id
      WHERE c.year = $1
      ORDER BY n.rank ASC
    `;
    const { rows } = await pool.query(query, [year]);
    return rows.map(this._mapToDomainWithPlayer);
  }

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM nominations WHERE id = $1', [id]);
    return rows.length ? this._mapToDomain(rows[0]) : null;
  }

  async save(nomination) {
    const query = `
      INSERT INTO nominations (ceremony_id, player_id, rank, votes_received)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const params = [nomination.ceremonyId, nomination.playerId, nomination.rank, nomination.votesReceived || 0];
    const { rows } = await pool.query(query, params);
    return this._mapToDomain(rows[0]);
  }

  async delete(id) {
    await pool.query('DELETE FROM nominations WHERE id = $1', [id]);
    return true;
  }

  _mapToDomain(row) {
    return {
      id: row.id,
      ceremonyId: row.ceremony_id,
      playerId: row.player_id,
      rank: row.rank,
      votesReceived: row.votes_received
    };
  }

  _mapToDomainWithPlayer(row) {
    const playerPhotoUrl = row.player_photo_url;
    return {
      id: row.id,
      ceremonyId: row.ceremony_id,
      playerId: row.player_id,
      rank: row.rank,
      votesReceived: row.votes_received,
      player: {
        id: row.player_id,
        name: row.player_name,
        photoUrl: CloudinaryHelper.getProfileUrl(playerPhotoUrl),
        bannerUrl: CloudinaryHelper.getBannerUrl(playerPhotoUrl),
        nationality: row.player_nationality,
        club: row.player_club,
        position: row.player_position
      }
    };
  }
}

module.exports = NominationPgRepository;
