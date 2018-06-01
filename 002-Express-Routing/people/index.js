const express = require('express');
const router = express.Router();
const middleware = require('./middleware');

//this looks bad how to clear this
const _find = require('./methods/find');
const _get = require('./methods/get');
const _post = require('./methods/post');
const _delete = require('./methods/delete');
const _patch = require('./methods/patch');

router.get('/', middleware, _find);

router.get('/:id', _get);

router.post('/', _post);

router.delete('/:id', _delete);

router.patch('/:id', _patch);


module.exports = router;
