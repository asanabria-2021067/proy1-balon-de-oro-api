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

    const nominations = await this.nominationRepository.findByYear(year);

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
