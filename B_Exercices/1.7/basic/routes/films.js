var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';

const FILMS = [
  {
    id: 1,
    title: 'The hunger games',
    duration: 157,
    budget: 8000000,
    link: 'https://www.imdb.com/title/tt1392170/'
  },
  {
    id: 2,
    title: 'TED',
    duration: 106,
    budget: 1000000,
    link: 'https://www.imdb.com/title/tt1637725/?ref_=nv_sr_srsg_7_tt_3_nm_4_q_ted'
  },
  {
    id: 3,
    title: 'Mishima, a life in four chapters',
    duration: 120,
    budget: 100000,
    link: 'https://www.imdb.com/title/tt0089603/?ref_=nv_sr_srsg_0_tt_3_nm_5_q_mishima'
  },
];

/* GET home page. 
    GET : films?minimum-duration=value only getting films that last at least the value*/
router.get('/', (req, res, next) => {
  const minimumFilmDuration = req?.query
    ? Number(req.query['minimum-duration'])
    : undefined;
  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.sendStatus(400);

  const films = parse(jsonDbPath, FILMS);

  if (!minimumFilmDuration) return res.json(films);

  const filmsReachingMinimumDuration = films.filter(
    (film) => film.duration >= minimumFilmDuration
  );
  return res.json(filmsReachingMinimumDuration);
  
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

  if (req.params.id < 1) res.sendStatus(404)

  const films = parse(jsonDbPath, FILMS); 
  
  const indexOFFIlm = films.findIndex((film) => film.id == req.params.id)

  res.json(films[indexOFFIlm])
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

  const films = parse(jsonDbPath, FILMS);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id : nextId,
    title: title,
    duration: duration,
    budget: budget,
    link:link
  };

  if (films.some(film => film.title === newFilm.title)) return res.sendStatus(409);
  
  films.push(newFilm);

  return res.json(newFilm)
});

// SUPPRIMER UN FILM
router.delete('/:id', (req,res) => {
  console.log(`DELETE PIZZA : ${req.params.id}`)

  if (req.params.id < 0) return res.sendStatus(400)

  const films = parse(jsonDbPath,FILMS);
  
  const indexOf = films.findIndex(film => film.id == req.params.id);
  console.log(`index value = ${indexOf}`);
  const filmSupr = films[indexOf];

  films.splice(indexOf,1);
  

  res.json(filmSupr);
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

  const films = parse(jsonDbPath, FILMS)

  //if(typeof duration !== 'number' || typeof budget !== 'number' || budget < 0 || duration < 0)
  //return res.sendStatus(400);

  const indexOf = films.findIndex(film => film.id == req.params.id);
  if(indexOf < 0) return res.sendStatus(404);

  const updatedFilm = {...films[indexOf], ...req.body};

  films[indexOf] = updatedFilm;

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

  const films = parse(jsonDbPath, FILMS);

  const indexOf = films.findIndex(film => film.id == req.params.id);
  if(indexOf < 0) {
    const newFilm = {id, title, duration, budget, link}
    films.push(newFilm);
    return res.json(newFilm);
  }

  const updatedFilm = {...films[indexOf], ...req.body};

  films[indexOf] = updatedFilm;

  res.json(updatedFilm)
})
module.exports = router;
