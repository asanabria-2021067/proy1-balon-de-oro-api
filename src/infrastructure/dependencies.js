const PlayerPgRepository = require('./db/PlayerPgRepository');
const CeremonyPgRepository = require('./db/CeremonyPgRepository');
const NominationPgRepository = require('./db/NominationPgRepository');
const RatingPgRepository = require('./db/RatingPgRepository');

const CloudinaryUploader = require('./cloudinary/CloudinaryUploader');

const GetAllPlayers = require('../application/player/GetAllPlayers');
const GetPlayerById = require('../application/player/GetPlayerById');
const CreatePlayer = require('../application/player/CreatePlayer');
const UpdatePlayer = require('../application/player/UpdatePlayer');
const DeletePlayer = require('../application/player/DeletePlayer');

const GetAllCeremonies = require('../application/ceremony/GetAllCeremonies');
const GetCeremonyByYear = require('../application/ceremony/GetCeremonyByYear');
const CreateCeremony = require('../application/ceremony/CreateCeremony');
const UpdateCeremony = require('../application/ceremony/UpdateCeremony');
const DeleteCeremony = require('../application/ceremony/DeleteCeremony');

const GetNominationsByCeremony = require('../application/nomination/GetNominationsByCeremony');
const AddNomination = require('../application/nomination/AddNomination');
const DeleteNomination = require('../application/nomination/DeleteNomination');

const AddRating = require('../application/rating/AddRating');
const GetNominationRating = require('../application/rating/GetNominationRating');

const PlayerController = require('./http/controllers/PlayerController');
const CeremonyController = require('./http/controllers/CeremonyController');
const NominationController = require('./http/controllers/NominationController');
const RatingController = require('./http/controllers/RatingController');

const playerRepository = new PlayerPgRepository();
const ceremonyRepository = new CeremonyPgRepository();
const nominationRepository = new NominationPgRepository();
const ratingRepository = new RatingPgRepository();
const imageUploader = new CloudinaryUploader();

const playerController = new PlayerController(
  new GetAllPlayers(playerRepository),
  new GetPlayerById(playerRepository, nominationRepository),
  new CreatePlayer(playerRepository, imageUploader, ceremonyRepository, nominationRepository),
  new UpdatePlayer(playerRepository, imageUploader, ceremonyRepository, nominationRepository),
  new DeletePlayer(playerRepository)
);

const ceremonyController = new CeremonyController(
  new GetAllCeremonies(ceremonyRepository),
  new GetCeremonyByYear(ceremonyRepository, nominationRepository, ratingRepository),
  new CreateCeremony(ceremonyRepository),
  new UpdateCeremony(ceremonyRepository),
  new DeleteCeremony(ceremonyRepository)
);

const nominationController = new NominationController(
  new GetNominationsByCeremony(ceremonyRepository, nominationRepository),
  new AddNomination(ceremonyRepository, nominationRepository),
  new DeleteNomination(nominationRepository)
);

const ratingController = new RatingController(
  new AddRating(nominationRepository, ratingRepository),
  new GetNominationRating(nominationRepository, ratingRepository)
);

module.exports = {
  playerController,
  ceremonyController,
  nominationController,
  ratingController
};
