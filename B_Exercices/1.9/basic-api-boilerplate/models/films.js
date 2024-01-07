const path = require('node:path');
const {parse, serialize} = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const defaultFilms = [
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

function readAllFilmsPotentiallyOrdered(duration) {
    const films = parse(jsonDbPath, defaultFilms);

    if(duration === undefined) return films

    const minDuration = Number(duration);
    if(Number.isNaN(minDuration) || minDuration < 0) return undefined;

    const filmsReachingMinimumDuration = films.filter(
    (film) => film.duration >= minDuration
    );

    return filmsReachingMinimumDuration
};

function getFilmById(id) {
    const idNumber = parseInt(id,10);

    const films = parse(jsonDbPath, defaultFilms); 
  
    const index = films.findIndex((film) => film.id === idNumber)

    return films[index];
}

function createNewFilm(title, duration, budget, link) {
    const films = parse(jsonDbPath, defaultFilms);

    const newFilm = {
        id: getNextId(),
        title,
        duration,
        budget,
        link
    }

    if (films.some(film => film.title === newFilm.title)) return undefined;

    films.push(newFilm);

    serialize(jsonDbPath,films);

    return newFilm
}

function getNextId() {
    const films = parse(jsonDbPath, defaultFilms);

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if(lastItemIndex === undefined) return 1;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;
    return nextId
}

function deleteFilm(id) {
    const films = parse(jsonDbPath,defaultFilms);

    const indexOf = films.findIndex(film => film.id === Number(id));
    console.log(`index value = ${indexOf}`);
    const filmSupr = films[indexOf];

    films.splice(indexOf,1);

    return filmSupr
}

function updateOneFilmPartially(id, newProperties) {
    const films = parse(jsonDbPath, defaultFilms);
    const idAsNumber = parseInt(id,10)

    const indexOf = films.findIndex(film => film.id === idAsNumber);
    if (indexOf < 0) return undefined;

    const updatedFilm = { ...films[indexOf], ...newProperties };

    films[indexOf] = updatedFilm;

    serialize(jsonDbPath, films);

    return updatedFilm;
}

function updateoneFilmFully(id, newProperties) {
    const films = parse(jsonDbPath, defaultFilms);
    const idAsNumber = parseInt(id,10);

    const indexOf = films.findIndex(film => film.id === idAsNumber);
    if(indexOf < 0) {
        const newFilm = {id: idAsNumber, ...newProperties}
        films.push(newFilm);
        serialize(jsonDbPath, films)
        return newFilm;
    }

  const updatedFilm = { ...films[indexOf], ...newProperties};
  films[indexOf] = updatedFilm;

  serialize(jsonDbPath, films);
  
  return updatedFilm;
}

module.exports = {
    readAllFilmsPotentiallyOrdered,
    getFilmById,
    createNewFilm,
    deleteFilm,
    updateOneFilmPartially,
    updateoneFilmFully
}