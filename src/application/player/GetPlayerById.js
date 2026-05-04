class GetPlayerById {
  constructor(playerRepository, nominationRepository) {
    this.playerRepository = playerRepository;
    this.nominationRepository = nominationRepository;
  }

  async execute(id) {
    const player = await this.playerRepository.findById(id);
    if (!player) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    const nominations = await this.nominationRepository.findByPlayer(id);
    player.nominations = nominations;

    return player;
  }
}

module.exports = GetPlayerById;
