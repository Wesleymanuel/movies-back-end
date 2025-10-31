const express = require("express")
const router = express.Router()
const middleweres = require('../middleweres/middlleweres')
const controlerrs = require('../controllers/controlers')


router.post('/ola', controlerrs.mensage)

router.delete('/delete', middleweres.verificacao, controlerrs.exclusao )
 
module.exports = router