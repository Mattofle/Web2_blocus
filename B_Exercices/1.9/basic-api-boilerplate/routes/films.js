const express = require('express');
const {
  readAllFilmsPotentiallyOrdered,
  getFilmById,
  createNewFilm,
  deleteFilm,
  updateOneFilmPartially,
  updateoneFilmFully
} = require('../models/films');


const router = express.Router();


/* GET home page. 
    GET : films?minimum-duration=value only getting films that last at least the value */
router.get('/', (req, res) => {
  const filmList = readAllFilmsPotentiallyOrdered(req?.query?.['minimum-duration']);

  if (filmList === undefined) return res.sendStatus(400);

  
  return res.json(readAllFilmsPotentiallyOrdered);
  
  /*
  console.log('GET films')
  const minDuration = req?.query?.['minimum-duration'] ? req.query['minimum-duration'] : undefined
  if (minDuration <= 0 || isNaN(minDuration)) return res.sendStatus(400);
  let filmsByDuration

  const films = parse(jsonDbPath, FILMS); 
  console.log(`films = ${films}`);
  console.log(`valeur min dur = ${minDuration}`);

  if (minDuration === undefined) return res.json(films)  

  filmsByDuration = [...films].filter((film) => film.duration >= minDuration);
  return res.json(filmsByDuration);
  */
});

// RECHERCHER UN FILM PAR SON ID
router.get('/:id', (req,res) => {
  console.log(`GET film by id : ${req.params.id}`)

  const filmFound = getFilmById(req.params.id);

  if (filmFound === undefined) return res.sendStatus(404);
  
  return res.json(filmFound)
});

// AJOUTER UN FILM
router.post('/', (req,res) => {
  
  const title = req?.body?.title?.trim().length !== 0 ? req.body.title : undefined
  
  const duration =
    typeof req?.body?.duration !== 'number' || req?.body?.duration < 0
      ? undefined  
      : req.body.duration
  const budget = 
    typeof req?.body?.budget !== 'number' || req?.body?.budget < 0
      ? undefined
      : req.body.budget
  const link = req?.body?.link?.trim().length !== 0 ? req.body.link : undefined

  if(!title || !duration || !budget || !link) return res.sendStatus(404)

  const addedFilm = createNewFilm(title,duration,budget,link);

  if (addedFilm === undefined) return res.sendStatus(409);

  return res.json(addedFilm)
});

// SUPPRIMER UN FILM
router.delete('/:id', (req,res) => {
  console.log(`DELETE PIZZA : ${req.params.id}`)

  if (req.params.id < 0) return res.sendStatus(400)

  const filmSupr = deleteFilm(req.params.id);
  
  return res.json(filmSupr);
});

// UPDATE ONE OR MORE PARAMETERS BASE ON ID
router.patch('/:id', (req,res) => {
  console.log(`PATCH film : ${req.params.id}`);

  const title = req?.body?.title
  const duration = req?.body?.duration
  const budget = req?.body?.budget
  const link = req?.body?.link

  if ((!title && !duration && !budget && !link) || title?.length === 0 || link?.length === 0)
  return res.sendStatus(400);
  // if(typeof duration !== 'number' || typeof budget !== 'number' || budget < 0 || duration < 0)
  // return res.sendStatus(400);

  const updatedFilm = updateOneFilmPartially(req.params.id, {title, duration, budget, link});
  
  if(updatedFilm === undefined) return res.sendStatus(404);

  return res.json(updatedFilm)
  
})

// UPDATE ALL PARAMETERS OF A MOOVIE
router.put('/:id', (req,res) => {
  console.log(`PUT film : ${req.params.id}`)

  const title = req?.body?.title
  const duration = req?.body?.duration
  const budget = req?.body?.budget
  const link = req?.body?.link

  if(
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    duration === undefined ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  ) return res.sendStatus(400)

  const updatedOrnewFilm = updateoneFilmFully(req.params.id, {title, duration, budget, link});

  return res.json(updatedOrnewFilm);
})
module.exports = router;
