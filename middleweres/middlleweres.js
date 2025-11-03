
const middleweres = {
    verificacao : (req,res,next) => {
        const { email, senha } = req.body;

        if(!email || !senha){
           return res.status(404).json({msg : "os campos de email e senha sao obrigatorios"})
        }
        next()
    }

}

module.exports = middleweres