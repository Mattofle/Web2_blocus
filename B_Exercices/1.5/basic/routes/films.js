var express = require('express');
var router = express.Router();

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
    linl: 'https://www.imdb.com/title/tt1637725/?ref_=nv_sr_srsg_7_tt_3_nm_4_q_ted'
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
  console.log('GET films')
  const minDuration = req?.query?.['minimum-duration'] ? req.query['minimum-duration'] : undefined
  let filmsByDuration
  if (minDuration){
    if (minDuration <= 0 || typeof minDuration !== 'number') return res.sendStatus(400);
    filmsByDuration = [...FILMS].filter(film => film.duration >= minDuration);
  }
  res.json(filmsByDuration ?? FILMS)
});

router.get('/:id', (req,res) => {
  console.log(`GET film by id : ${req.params.id}`)

  if (req.params.id < 1) res.sendStatus(404)
  
  const indexOFFIlm = FILMS.findIndex((film) => film.id == req.params.id)

  res.json(FILMS[indexOFFIlm])
});

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

  const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id : nextId,
    title: title,
    duration: duration,
    budget: budget,
    link:link
  };

  if (FILMS.some(film => film.title === newFilm.title)) return res.sendStatus(409);
  
  FILMS.push(newFilm);

  res.json(newFilm)
});

module.exports = router;
