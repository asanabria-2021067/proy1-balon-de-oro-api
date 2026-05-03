class GetNominationsByCeremony {
  constructor(ceremonyRepository, nominationRepository) {
    this.ceremonyRepository = ceremonyRepository;
    this.nominationRepository = nominationRepository;
  }

  async execute(year) {
    const ceremony = await this.ceremonyRepository.findByYear(year);
    if (!ceremony) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    return await this.nominationRepository.findByCeremony(ceremony.id);
  }
}

module.exports = GetNominationsByCeremony;
