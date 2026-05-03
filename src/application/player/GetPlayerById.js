class GetPlayerById {
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute(id) {
    const player = await this.playerRepository.findById(id);
    if (!player) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    return player;
  }
}

module.exports = GetPlayerById;
