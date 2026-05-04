class GetAllPlayers {
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute(filters) {
    const { q, nationality, sort = 'name', order = 'asc' } = filters;
    return await this.playerRepository.findAll({ q, nationality, sort, order });
  }
}

module.exports = GetAllPlayers;
