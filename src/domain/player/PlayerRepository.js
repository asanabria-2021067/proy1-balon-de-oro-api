class PlayerRepository {
  constructor() {
    if (this.constructor === PlayerRepository) {
      throw new Error("Abstract class 'PlayerRepository' cannot be instantiated.");
    }
  }

  async findAll(filters) {
    throw new Error("Method 'findAll()' must be implemented.");
  }

  async findById(id) {
    throw new Error("Method 'findById()' must be implemented.");
  }

  async save(player) {
    throw new Error("Method 'save()' must be implemented.");
  }

  async update(id, playerData) {
    throw new Error("Method 'update()' must be implemented.");
  }

  async delete(id) {
    throw new Error("Method 'delete()' must be implemented.");
  }
}

module.exports = PlayerRepository;
