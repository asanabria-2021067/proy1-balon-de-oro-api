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
      const nomination = await this.addNomination.execute(req.params.year, req.body);
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
