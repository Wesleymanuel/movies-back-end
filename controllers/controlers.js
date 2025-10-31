const pool = require('../db/bd')
const bcript = require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SALT = 10
const JWT = process.env.JWT_SECRET


const controlerrs = {
    mensage : async (req,res) => {

        const {name , email, cpf, senha} = req.body;

        if(!name || !email || !cpf || !senha){
           return res.status(400).json({msg : "os campos de email e senha sao obrigatorios"})
        }

        const passowordHash = bcript.hashSync(senha,SALT)

    try{
            const query = `INSERT INTO usuarios (nome_user,email,cpf,senha) VALUES ($1,$2,$3,$4)`
            const results = await pool.query(query , [name, email, cpf,passowordHash])
            const token = jwt.sign({ id: user.id }, JWT, { expiresIn: "1d" });
            res.status(201).json({msg : "usuarios cadastrado com sucesso" , user: results.rows[0], token,})
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

},

    login : async (req,res) => {
        const { name, senha, email } = req.body;

        if(!name || !senha){
           return res.status(400).json({msg : "os campos de email e senha sao obrigatorios"})
        }

        try{
            const query = `SELECT id,senha FROM usuarios WHERE email = $1`
            const results = await pool.query(query , [email])
            const user = results.rows[0]

            if (!user) {
                 return res.status(404).json({ msg: 'Usuário não encontrado' });
            }

            const passorwordCompare = bcript.compare(senha, user.senha)

            if(!passorwordCompare){
                return res.status(401).json({msg : "senha incorreta"})
            }

            jwt.sign({id : user.id}, JWT , {expiresIn : "1d"})
            
                res.status(200).json({
                        msg: 'Login realizado com sucesso',
                        user: { id: user.id, nome: user.nome, email: user.email },
                        token,
                    });
            
        }
        catch(error){

        }
    }
}

module.exports = controlerrs