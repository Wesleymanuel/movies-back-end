const express = require("express")
const router = express.Router()
const middleweres = require('../middleweres/middlleweres')
const controlerrs = require('../controllers/controlers')



router.post('/ola', middleweres.verificacao ,controlerrs.cadastro)

router.post('/login', middleweres.verificacao, controlerrs.login)

router.delete('/delete', middleweres.verificacao, controlerrs.exclusao )

router.put('/atualizacao' , middleweres.verificacao , controlerrs.atualizacao)
 
module.exports = router