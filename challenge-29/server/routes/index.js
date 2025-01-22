'use strict';

let express = require('express');
let router = express.Router();
let data = [];

router.get('/', function(req, res) {
  console.log('[GET] /car:', data)
  res.json(data);
});

router.post('/', function(req, res) {
  data.push({
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color
  });
  console.log('[POST] /car:', JSON.stringify({
    body: req.body,
    data
  }, null, 2))
  res.json({ message: 'success' });
});

router.delete('/:plate', function(req, res) {
  const { plate } = req.params;

  const carIndex = data.findIndex(car => car.plate === plate);

  if (carIndex === -1) {
    return res.status(404).json({ message: 'Carro não encontrado.' });
  }

  data.splice(carIndex, 1);

  console.log(`[DELETE] /car/${plate} - Carro removido`);
  res.json({ message: 'Carro removido com sucesso.' });
});


module.exports = router;
