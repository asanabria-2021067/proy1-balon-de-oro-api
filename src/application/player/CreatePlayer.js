class CreatePlayer {
  constructor(playerRepository, imageUploader) {
    this.playerRepository = playerRepository;
    this.imageUploader = imageUploader;
  }

  async execute(playerData, imageFile) {
    let photoUrl = null;
    if (imageFile) {
      photoUrl = await this.imageUploader.upload(imageFile);
    }

    const player = {
      ...playerData,
      photoUrl
    };

    return await this.playerRepository.save(player);
  }
}

module.exports = CreatePlayer;
