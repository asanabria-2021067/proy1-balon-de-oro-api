class GetCountryStats {
  constructor(statsRepository) {
    this.statsRepository = statsRepository;
  }

  async execute() {
    return await this.statsRepository.getCountryStats();
  }
}

module.exports = GetCountryStats;
