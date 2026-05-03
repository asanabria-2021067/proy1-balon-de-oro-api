class AddNomination {
  constructor(ceremonyRepository, nominationRepository) {
    this.ceremonyRepository = ceremonyRepository;
    this.nominationRepository = nominationRepository;
  }

  async execute(year, nominationData) {
    const ceremony = await this.ceremonyRepository.findByYear(year);
    if (!ceremony) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    const nominations = await this.nominationRepository.findByCeremony(ceremony.id);
    
    // Check for duplicate rank or player
    const duplicateRank = nominations.find(n => n.rank === nominationData.rank);
    if (duplicateRank) {
      const error = new Error("Duplicate rank in nomination");
      error.status = 409;
      throw error;
    }

    const duplicatePlayer = nominations.find(n => n.playerId === nominationData.playerId);
    if (duplicatePlayer) {
      const error = new Error("Player already nominated for this ceremony");
      error.status = 409;
      throw error;
    }

    const newNomination = {
      ...nominationData,
      ceremonyId: ceremony.id
    };

    return await this.nominationRepository.save(newNomination);
  }
}

module.exports = AddNomination;
