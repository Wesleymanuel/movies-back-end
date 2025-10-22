const pool = require('../db/bd')


const controlerrs = {
    mensage : async (req,res) => {

        const {name , email, cpf} = req.body;

        if(!name || !email || !cpf){
           return res.status(400).json({msg : "os campos de email e senha sao obrigatorios"})
        }
    try{
            const query = `INSERT INTO usuarios (nome,email,cpf) VALUES ($1,$2,$3)`
            const results = await pool.query(query , [name, email, cpf])
            res.status(201).json({msg : "usuarios cadastrado com sucesso" , user: results.rows[0]})
        }
    catch(error){
        console.log(error)
        res.status(500).json({msg : "erro no servidor"})
    }
},


    exclusao : async (req,res) => {
        const {name} = req.body;

        try{
        if(!name){
            return res.status(400).json({msg : "os campos sao obrigatorios para deletar"})
        }
        const query = `DELETE FROM usuarios WHERE nome = $1`
        await pool.query(query,[name])
        res.status(201).json({msg : "usuarios deletado com sucesso"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg : "erro no servidor"})
    }

}
}

module.exports = controlerrs