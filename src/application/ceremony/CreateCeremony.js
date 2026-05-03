class CreateCeremony {
  constructor(ceremonyRepository) {
    this.ceremonyRepository = ceremonyRepository;
  }

  async execute(ceremonyData) {
    const existing = await this.ceremonyRepository.findByYear(ceremonyData.year);
    if (existing) {
      const error = new Error("Duplicate year in ceremonies");
      error.status = 409;
      throw error;
    }
    return await this.ceremonyRepository.save(ceremonyData);
  }
}

module.exports = CreateCeremony;
