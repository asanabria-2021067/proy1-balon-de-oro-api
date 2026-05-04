class NominationRepository {
  constructor() {
    if (this.constructor === NominationRepository) {
      throw new Error("Abstract class 'NominationRepository' cannot be instantiated.");
    }
  }

  async findByCeremony(ceremonyId) {
    throw new Error("Method 'findByCeremony()' must be implemented.");
  }

  async findByPlayer(playerId) {
    throw new Error("Method 'findByPlayer()' must be implemented.");
  }

  async findById(id) {
    throw new Error("Method 'findById()' must be implemented.");
  }

  async save(nomination) {
    throw new Error("Method 'save()' must be implemented.");
  }

  async delete(id) {
    throw new Error("Method 'delete()' must be implemented.");
  }
}

module.exports = NominationRepository;
