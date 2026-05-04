class AddNomination {
  constructor(ceremonyRepository, nominationRepository) {
    this.ceremonyRepository = ceremonyRepository;
    this.nominationRepository = nominationRepository;
  }

  async execute({ playerId, year, rank, reassign = false }) {
    const ceremony = await this.ceremonyRepository.findByYear(year);
    if (!ceremony) {
      const error = new Error(`Ceremony for year ${year} not found`);
      error.status = 404;
      throw error;
    }

    const nominations = await this.nominationRepository.findByCeremony(ceremony.id);
    
    const duplicatePlayer = nominations.find(n => n.playerId === playerId);
    if (duplicatePlayer) {
      const error = new Error(`Player is already nominated for year ${year}`);
      error.status = 409;
      throw error;
    }

    const occupiedRank = nominations.find(n => n.rank === rank);
    if (occupiedRank) {
      if (reassign) {
        await this.nominationRepository.delete(occupiedRank.id);
      } else {
        const error = new Error(`Position ${rank} is already occupied for year ${year}`);
        error.status = 409;
        throw error;
      }
    }

    const newNomination = {
      playerId,
      rank,
      ceremonyId: ceremony.id,
      votesReceived: 0
    };

    return await this.nominationRepository.save(newNomination);
  }
}

module.exports = AddNomination;
