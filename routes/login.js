const express = require("express")
const router = express.Router()
const middleweres = require('../middleweres/middlleweres')
const controlerrs = require('../controllers/controlers')


router.post('/ola', middleweres.verificacao, controlerrs.mensage)
 
module.exports = router