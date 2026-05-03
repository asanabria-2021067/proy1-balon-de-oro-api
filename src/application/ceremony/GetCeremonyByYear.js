class GetCeremonyByYear {
  constructor(ceremonyRepository, nominationRepository, ratingRepository) {
    this.ceremonyRepository = ceremonyRepository;
    this.nominationRepository = nominationRepository;
    this.ratingRepository = ratingRepository;
  }

  async execute(year) {
    const ceremony = await this.ceremonyRepository.findByYear(year);
    if (!ceremony) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    const nominations = await this.nominationRepository.findByCeremony(ceremony.id);
    
    // For each nomination, get player info and average rating
    // This logic might be better handled in the repository for performance, 
    // but here we are orchestrating in the application layer as per Hexagonal.
    // However, for pure Hexagonal, the repository should return what we need if it's a specific domain requirement.
    // I'll assume the nominationRepository returns joined data or I'll map it here.
    
    const detailedNominations = await Promise.all(nominations.map(async (nom) => {
      const averageRating = await this.ratingRepository.getAverageByNomination(nom.id);
      return {
        ...nom,
        averageRating
      };
    }));

    return {
      ...ceremony,
      nominations: detailedNominations
    };
  }
}

module.exports = GetCeremonyByYear;
