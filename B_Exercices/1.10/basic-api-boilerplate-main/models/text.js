const path = require('node:path');
const { v4 : uuidv4 } =  require('uuid');
const {parse, serialize} = require('../utils/json');

const jsonDbPath = path.join(__dirname,'../data/text.json');

function validationLevel(level){
    const existingLevels = ['easy','medium','hard'];
    return existingLevels.some(existingLevel => existingLevel === level);
}

function readALL(level){

    const textes = parse(jsonDbPath);

    if(!level) return textes;

    if (!validationLevel(level)) return undefined;
    
    const filteredByLevel = [...textes].filter(a => a.level === level);

    return (filteredByLevel);
}

function readById(id){
    // const idAsNumber = parseInt(id,10);
    const textes = parse(jsonDbPath);

    const indexOfText = textes.findIndex(text => text.id === id);
    if (indexOfText < 0) return undefined;

    return textes[indexOfText];
}

function createText(text, level){
    const textes = parse(jsonDbPath);

    const newText = {
        id : uuidv4(),
        text,
        level
    };

    textes.push(newText);

    serialize(jsonDbPath, textes);

    return newText
}

function deleteText(id){
    const textes = parse(jsonDbPath);

    const indexOfText = textes.findIndex(text => text.id === id);
    if (indexOfText < 0) return undefined;

    const deletedTextes = textes.splice(indexOfText,1);
    const deletedText = deletedTextes[0];

    serialize(jsonDbPath,textes);

    return deletedText;
}

function updateOneTexte(id,texte, level){
    const textes = parse(jsonDbPath);

    const indexOfText = textes.findIndex(text => text.id === id);
    if (indexOfText < 0) return undefined;

    const newProperties = {
        texte,
        level
    }

    const updatedText = {...texte[indexOfText], ...newProperties}
    textes[indexOfText] = updatedText;

    serialize(jsonDbPath,textes);

    return updatedText;
}

module.exports = {
    readALL,
    readById,
    createText,
    deleteText,
    updateOneTexte,
    validationLevel
};