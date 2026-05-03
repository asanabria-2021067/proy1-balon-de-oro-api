class UpdatePlayer {
  constructor(playerRepository, imageUploader) {
    this.playerRepository = playerRepository;
    this.imageUploader = imageUploader;
  }

  async execute(id, playerData, imageFile) {
    const existingPlayer = await this.playerRepository.findById(id);
    if (!existingPlayer) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    let photoUrl = existingPlayer.photoUrl;
    if (imageFile) {
      photoUrl = await this.imageUploader.upload(imageFile);
    }

    const updatedData = {
      ...playerData,
      photoUrl
    };

    return await this.playerRepository.update(id, updatedData);
  }
}

module.exports = UpdatePlayer;
