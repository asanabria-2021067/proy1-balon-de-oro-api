class NominationController {
  constructor(getNominationsByCeremony, addNomination, deleteNomination) {
    this.getNominationsByCeremony = getNominationsByCeremony;
    this.addNomination = addNomination;
    this.deleteNomination = deleteNomination;
  }

  async getByCeremony(req, res, next) {
    try {
      const nominations = await this.getNominationsByCeremony.execute(req.params.year);
      res.json(nominations);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { jugadorId, año, puesto, reassign, playerId, year, rank } = req.body;
      
      const data = {
        playerId: jugadorId || playerId || req.body.player_id,
        year: año || year || req.params.year,
        rank: puesto || rank || req.body.rank,
        reassign: reassign === true || reassign === 'true'
      };

      if (!data.year) {
        const error = new Error("Year (año) is required");
        error.status = 400;
        throw error;
      }

      const nomination = await this.addNomination.execute(data);
      res.status(201).json(nomination);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await this.deleteNomination.execute(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = NominationController;
