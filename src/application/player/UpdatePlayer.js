const AddNomination = require('../nomination/AddNomination');

class UpdatePlayer {
  constructor(playerRepository, imageUploader, ceremonyRepository, nominationRepository) {
    this.playerRepository = playerRepository;
    this.imageUploader = imageUploader;
    this.addNomination = new AddNomination(ceremonyRepository, nominationRepository);
    this.nominationRepository = nominationRepository;
  }

  async execute(id, playerData, imageFile) {
    const existingPlayer = await this.playerRepository.findById(id);
    if (!existingPlayer) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }

    let photoUrl = existingPlayer.photoUrl;
    if (imageFile) {
      photoUrl = await this.imageUploader.upload(imageFile);
    } else if (playerData.photoUrl) {
      photoUrl = playerData.photoUrl;
    }

    const { photoUrl: _ignored, nominationYear, nominationRank, ...rest } = playerData;
    const player = await this.playerRepository.update(id, { ...rest, photoUrl });

    if (nominationYear && nominationRank) {
      try {
        const existingNominations = await this.nominationRepository.findByPlayer(id);
        const nominationForYear = existingNominations.find(n => n.year == nominationYear);

        if (nominationForYear && nominationForYear.rank != nominationRank) {
          await this.nominationRepository.delete(nominationForYear.id);
          await this.addNomination.execute({
            playerId: id,
            year: parseInt(nominationYear),
            rank: parseInt(nominationRank),
            reassign: true
          });
        } else if (!nominationForYear) {
          await this.addNomination.execute({
            playerId: id,
            year: parseInt(nominationYear),
            rank: parseInt(nominationRank),
            reassign: true
          });
        }
      } catch (error) {
        console.error('Failed to update nomination:', error.message);
      }
    }

    return player;
  }
}

module.exports = UpdatePlayer;
