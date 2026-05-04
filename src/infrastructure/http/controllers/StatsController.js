const StatsRepository = require('../../db/StatsRepository');
const GetCountryStats = require('../../../application/stats/GetCountryStats');

const statsRepository = new StatsRepository();
const getCountryStatsUseCase = new GetCountryStats(statsRepository);

class StatsController {
  async getCountryStats(req, res, next) {
    try {
      const stats = await getCountryStatsUseCase.execute();
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StatsController();
