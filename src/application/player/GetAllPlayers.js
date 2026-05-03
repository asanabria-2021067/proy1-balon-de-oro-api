class GetAllPlayers {
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute(filters) {
    const { page = 1, limit = 10, q, nationality, sort = 'name', order = 'asc' } = filters;
    return await this.playerRepository.findAll({ page, limit, q, nationality, sort, order });
  }
}

module.exports = GetAllPlayers;
