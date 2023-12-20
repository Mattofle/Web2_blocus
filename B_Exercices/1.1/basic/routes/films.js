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
    durations: 120,
    budget: 100000,
    link: 'https://www.imdb.com/title/tt0089603/?ref_=nv_sr_srsg_0_tt_3_nm_5_q_mishima'
  },
];

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('GET films')
  res.json(FILMS);
});

module.exports = router;
