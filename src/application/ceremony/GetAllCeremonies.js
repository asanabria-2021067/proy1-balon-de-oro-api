class GetAllCeremonies {
  constructor(ceremonyRepository) {
    this.ceremonyRepository = ceremonyRepository;
  }

  async execute() {
    return await this.ceremonyRepository.findAll();
  }
}

module.exports = GetAllCeremonies;
