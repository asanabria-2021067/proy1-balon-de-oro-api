class CreatePlayer {
  constructor(playerRepository, imageUploader) {
    this.playerRepository = playerRepository;
    this.imageUploader = imageUploader;
  }

  async execute(playerData, imageFile) {
    let photoUrl = playerData.photoUrl || null;
    if (imageFile) {
      photoUrl = await this.imageUploader.upload(imageFile);
    }

    const { photoUrl: _ignored, ...rest } = playerData;
    return await this.playerRepository.save({ ...rest, photoUrl });
  }
}

module.exports = CreatePlayer;
