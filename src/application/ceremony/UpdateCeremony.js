class UpdateCeremony {
  constructor(ceremonyRepository) {
    this.ceremonyRepository = ceremonyRepository;
  }

  async execute(year, ceremonyData) {
    const existing = await this.ceremonyRepository.findByYear(year);
    if (!existing) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    return await this.ceremonyRepository.update(year, ceremonyData);
  }
}

module.exports = UpdateCeremony;
