class PlayerController {
  constructor(getAllPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer) {
    this.getAllPlayers = getAllPlayers;
    this.getPlayerById = getPlayerById;
    this.createPlayer = createPlayer;
    this.updatePlayer = updatePlayer;
    this.deletePlayer = deletePlayer;
  }

  async getAll(req, res, next) {
    try {
      const players = await this.getAllPlayers.execute(req.query);
      res.json(players);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const player = await this.getPlayerById.execute(req.params.id);
      res.json(player);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const player = await this.createPlayer.execute(req.body, req.file);
      res.status(201).json(player);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const player = await this.updatePlayer.execute(req.params.id, req.body, req.file);
      res.json(player);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await this.deletePlayer.execute(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PlayerController;
