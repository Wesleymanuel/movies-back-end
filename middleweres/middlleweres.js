
const middleweres = {
    verificacao : (req,res,next) => {
        const { nome,email,cpf } = req.body;

        if(!nome || !email || !cpf){
           return res.status(404).json({msg : "os campos de email e senha sao obrigatorios"})
        }
        next()
    }

}

module.exports = middleweres