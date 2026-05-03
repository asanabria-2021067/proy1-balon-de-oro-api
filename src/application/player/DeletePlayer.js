class DeletePlayer {
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute(id) {
    const existingPlayer = await this.playerRepository.findById(id);
    if (!existingPlayer) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    return await this.playerRepository.delete(id);
  }
}

module.exports = DeletePlayer;
