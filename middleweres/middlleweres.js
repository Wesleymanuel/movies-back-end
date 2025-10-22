
const middleweres = {
    verificacao : (req,res,next) => {
        const { name,email } = req.body;

        if(!name && !email){
           return res.status(404).json({msg : "os campos de email e senha sao obrigatorios"})
        }
        next()
    }

}

module.exports = middleweres