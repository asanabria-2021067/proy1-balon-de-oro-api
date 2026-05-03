class CeremonyRepository {
  constructor() {
    if (this.constructor === CeremonyRepository) {
      throw new Error("Abstract class 'CeremonyRepository' cannot be instantiated.");
    }
  }

  async findAll() {
    throw new Error("Method 'findAll()' must be implemented.");
  }

  async findByYear(year) {
    throw new Error("Method 'findByYear()' must be implemented.");
  }

  async save(ceremony) {
    throw new Error("Method 'save()' must be implemented.");
  }

  async update(year, ceremonyData) {
    throw new Error("Method 'update()' must be implemented.");
  }

  async delete(year) {
    throw new Error("Method 'delete()' must be implemented.");
  }
}

module.exports = CeremonyRepository;
