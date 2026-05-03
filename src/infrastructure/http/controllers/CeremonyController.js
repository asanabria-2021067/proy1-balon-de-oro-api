class CeremonyController {
  constructor(getAllCeremonies, getCeremonyByYear, createCeremony, updateCeremony, deleteCeremony) {
    this.getAllCeremonies = getAllCeremonies;
    this.getCeremonyByYear = getCeremonyByYear;
    this.createCeremony = createCeremony;
    this.updateCeremony = updateCeremony;
    this.deleteCeremony = deleteCeremony;
  }

  async getAll(req, res, next) {
    try {
      const ceremonies = await this.getAllCeremonies.execute();
      res.json(ceremonies);
    } catch (err) {
      next(err);
    }
  }

  async getByYear(req, res, next) {
    try {
      const ceremony = await this.getCeremonyByYear.execute(req.params.year);
      res.json(ceremony);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const ceremony = await this.createCeremony.execute(req.body);
      res.status(201).json(ceremony);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const ceremony = await this.updateCeremony.execute(req.params.year, req.body);
      res.json(ceremony);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await this.deleteCeremony.execute(req.params.year);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CeremonyController;
