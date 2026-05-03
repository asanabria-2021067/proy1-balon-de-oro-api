class Ceremony {
  constructor({ id, year, winnerId, createdAt }) {
    this.id = id;
    this.year = year;
    this.winnerId = winnerId;
    this.createdAt = createdAt;
  }
}

module.exports = Ceremony;
