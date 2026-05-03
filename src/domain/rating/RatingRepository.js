class RatingRepository {
  constructor() {
    if (this.constructor === RatingRepository) {
      throw new Error("Abstract class 'RatingRepository' cannot be instantiated.");
    }
  }

  async save(rating) {
    throw new Error("Method 'save()' must be implemented.");
  }

  async getAverageByNomination(nominationId) {
    throw new Error("Method 'getAverageByNomination()' must be implemented.");
  }

  async getAllByNomination(nominationId) {
    throw new Error("Method 'getAllByNomination()' must be implemented.");
  }
}

module.exports = RatingRepository;
