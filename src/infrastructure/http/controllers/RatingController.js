class RatingController {
  constructor(addRating, getNominationRating) {
    this.addRating = addRating;
    this.getNominationRating = getNominationRating;
  }

  async create(req, res, next) {
    try {
      const rating = await this.addRating.execute(req.params.id, req.body);
      res.status(201).json(rating);
    } catch (err) {
      next(err);
    }
  }

  async getRating(req, res, next) {
    try {
      const ratingInfo = await this.getNominationRating.execute(req.params.id);
      res.json(ratingInfo);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RatingController;
