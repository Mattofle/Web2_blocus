const express = require('express');
const {
    readALL,
    readById,
    createText,
    deleteText,
    updateOneTexte,
    validationLevel
} = require('../models/text');

const router = express.Router();

router.get('/', (req,res) => {
    const allTextPotentiallyFIltered = readALL(req?.query?.level);

    return res.json(allTextPotentiallyFIltered);
});

router.get('/:id', (req,res) => {
    const findText = readById(req.params.id);

    if(!findText) return res.sendStatus(404);
    
    return res.json(findText);
})

router.post('/', (req,res) => {
    const text = req?.body?.text?.lenght !== 0 ? req.body.text : undefined;
    const level = validationLevel(req?.body?.level) ? req.body.level : undefined;

    if (!text || !level) return res.sendStatus(400);

    const newText = createText(text,level);
    
    return res.json(newText);
})

router.delete('/:id', (req,res) => {
    const deletedText = deleteText(req?.params?.id);

    if (!deletedText) return res.sendStatus(404);

    return res.json(deleteText);
})

router.put('/:id', (req,res) => {
    const text = req?.body?.text?.lenght !== 0 ? req.body.text : undefined;
    const level = validationLevel(req?.body?.level) ? req.body.level : undefined;

    if (!text || !level) return res.sendStatus(400);

    const updatedPizza = updateOneTexte(req?.params?.id,text,level);

    if (!updatedPizza) return res.sendStatus(404);

    return res.json(updatedPizza);
})


module.exports = router;