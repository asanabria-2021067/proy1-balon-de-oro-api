const AddNomination = require('../nomination/AddNomination');

class CreatePlayer {
  constructor(playerRepository, imageUploader, ceremonyRepository, nominationRepository) {
    this.playerRepository = playerRepository;
    this.imageUploader = imageUploader;
    this.addNomination = new AddNomination(ceremonyRepository, nominationRepository);
  }

  async execute(playerData, imageFile) {
    let photoUrl = playerData.photoUrl || null;
    if (imageFile) {
      photoUrl = await this.imageUploader.upload(imageFile);
    }

    const { photoUrl: _ignored, nominationYear, nominationRank, ...rest } = playerData;
    const player = await this.playerRepository.save({ ...rest, photoUrl });

    if (nominationYear && nominationRank) {
      try {
        await this.addNomination.execute({
          playerId: player.id,
          year: parseInt(nominationYear),
          rank: parseInt(nominationRank),
          reassign: true
        });
      } catch (error) {
        console.error('Failed to add nomination:', error.message);
      }
    }

    return player;
  }
}

module.exports = CreatePlayer;
