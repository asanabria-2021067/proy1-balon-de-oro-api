class Player {
  constructor({ id, name, nationality, club, position, photoUrl, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.nationality = nationality;
    this.club = club;
    this.position = position;
    this.photoUrl = photoUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Player;
