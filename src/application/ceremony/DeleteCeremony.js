class DeleteCeremony {
  constructor(ceremonyRepository) {
    this.ceremonyRepository = ceremonyRepository;
  }

  async execute(year) {
    const existing = await this.ceremonyRepository.findByYear(year);
    if (!existing) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    return await this.ceremonyRepository.delete(year);
  }
}

module.exports = DeleteCeremony;
