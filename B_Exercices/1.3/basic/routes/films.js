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
    filmsByDuration = [...FILMS].filter(film => film.duration >= minDuration);
  }
  res.json(filmsByDuration ?? FILMS)
});

router.get('/:id', (req,res) => {
  console.log(`GET film by id : ${req.params.id}`)
  
  const indexOFFIlm = FILMS.findIndex((film) => film.id == req.params.id)

  res.json(FILMS[indexOFFIlm])
});

router.post('/', (req,res) => {
  
  const title = req?.body?.title ? req.body.title : undefined
  const duration = req?.body?.duration ? req.body.duration : undefined
  const budget = req?.body?.budget ? req.body.budget : undefined
  const link = req?.body?.link ? req.body.link : undefined

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
  
  FILMS.push(newFilm);

  res.json(newFilm)
});

module.exports = router;
