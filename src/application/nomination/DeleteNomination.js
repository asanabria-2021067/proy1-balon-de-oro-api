class DeleteNomination {
  constructor(nominationRepository) {
    this.nominationRepository = nominationRepository;
  }

  async execute(id) {
    const existing = await this.nominationRepository.findById(id);
    if (!existing) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    return await this.nominationRepository.delete(id);
  }
}

module.exports = DeleteNomination;
