class GetAllPlayers {
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute(filters) {
    const { q, nationality, sort = 'name', order = 'asc', page = 1, limit = 12 } = filters;
    return await this.playerRepository.findAll({ q, nationality, sort, order, page: parseInt(page), limit: parseInt(limit) });
  }
}

module.exports = GetAllPlayers;
