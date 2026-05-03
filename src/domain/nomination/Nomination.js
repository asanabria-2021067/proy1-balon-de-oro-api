class Nomination {
  constructor({ id, ceremonyId, playerId, rank, votesReceived }) {
    this.id = id;
    this.ceremonyId = ceremonyId;
    this.playerId = playerId;
    this.rank = rank;
    this.votesReceived = votesReceived;
  }
}

module.exports = Nomination;
