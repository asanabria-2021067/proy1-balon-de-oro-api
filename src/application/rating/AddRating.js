class AddRating {
  constructor(nominationRepository, ratingRepository) {
    this.nominationRepository = nominationRepository;
    this.ratingRepository = ratingRepository;
  }

  async execute(nominationId, ratingData) {
    const nomination = await this.nominationRepository.findById(nominationId);
    if (!nomination) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    const newRating = {
      ...ratingData,
      nominationId
    };

    return await this.ratingRepository.save(newRating);
  }
}

module.exports = AddRating;
