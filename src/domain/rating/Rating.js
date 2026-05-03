class Rating {
  constructor({ id, nominationId, score, comment, createdAt }) {
    this.id = id;
    this.nominationId = nominationId;
    this.score = score;
    this.comment = comment;
    this.createdAt = createdAt;
  }
}

module.exports = Rating;
