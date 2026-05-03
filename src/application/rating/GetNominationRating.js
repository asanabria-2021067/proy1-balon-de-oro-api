class GetNominationRating {
  constructor(nominationRepository, ratingRepository) {
    this.nominationRepository = nominationRepository;
    this.ratingRepository = ratingRepository;
  }

  async execute(nominationId) {
    const nomination = await this.nominationRepository.findById(nominationId);
    if (!nomination) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    const average = await this.ratingRepository.getAverageByNomination(nominationId);
    const ratings = await this.ratingRepository.getAllByNomination(nominationId);

    return {
      average: average || 0,
      count: ratings.length,
      ratings
    };
  }
}

module.exports = GetNominationRating;
