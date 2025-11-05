const pool = require('../db/bd')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwt_secret = process.env.JWT

const controlerrs = {
    cadastro : async (req,res) => {

        const {nome,sobrenome,genero,cpf, pais,estado,cidade,email,senha} = req.body;

        if(!nome || !email || !cpf || !sobrenome || !pais || !estado || !cidade || !senha || !genero){
           return res.status(400).json({msg : "os campos de email e senha sao obrigatorios"})
        }

        const hashSenha = bcrypt.hashSync(senha,10)

    try{
            const query = `INSERT INTO usuarios (nome,sobrenome,genero,cpf,pais,estado,cidade,email,senha) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`
            const results = await pool.query(query , [nome,sobrenome,genero,cpf,pais,estado,cidade,email,hashSenha])
            res.status(201).json({msg : "usuarios cadastrado com sucesso" , user: results.rows[0]})
        }
    catch(error){
        console.log(error)
        res.status(500).json({msg : "erro no servidor"})
    }
},

    login : async (req,res) => {
        const { email,senha } = req.body;

        if(!email || !senha){
           return res.status(400).json({msg : "os campos de email e senha sao obrigatorios"})
        }

        try{
            const query = `SELECT id,senha FROM usuarios WHERE email = $1`
            const results = await pool.query(query , [email])
            const user = results.rows[0]

            if (!user) {
                 return res.status(404).json({ msg: 'Usuário não encontrado' });
            }

            const passorwordCompare = await bcrypt.compare(senha,user.senha)


            if(!passorwordCompare){
                return res.status(401).json({msg : "senha incorreta"})
            }

            const token = jwt.sign({id : user.id}, jwt_secret , {expiresIn : "1d"})
            
                res.status(200).json({msg: 'Login realizado com sucesso',user: { id: user.id},token ,});
            
        }
        catch(error){
            console.log(error)
        }
    },

    atualizacao : async (req,res) => {

      const  { email,senha } = req.body; 

        if(!email){
           return res.status(400).json({msg : "o campos de email e obrigatorio"})
        }

      try{
            const query = `SELECT id,senha FROM usuarios WHERE email = ($1)`
            const results = await pool.query(query,[email])
            const user = results.rows[0];

            if(!user){
            return res.status(401).json({msg : "usuario nao encontrado"})
            }

            const newPassowordHash = await bcrypt.hash(senha,10)

            if(!newPassowordHash){
            return res.status(500).json({msg : "problemas no servidor, tente novamente"})
            }

            const newQuery = `UPDATE usuarios SET senha = ($1) WHERE id = ($2)`
            await pool.query(newQuery,[newPassowordHash,user.id])

            res.status(200).json({msg : "senha renovada com sucesso"})

      }
      catch(error){
        console.log(error)
      }
    },

    exclusao : async (req,res) => {
        const {email, senha} = req.body;

        try{
            if(!email || !senha){
            return res.status(400).json({msg : "o campos de email e senha sao obrigatorios"})
            }

            const query = `SELECT id,senha FROM usuarios WHERE email = ($1)`;
            const results = await pool.query(query, [email])
            const user = results.rows[0]

            if(!user){
                return res.status(400).json({msg : "usuarios nao encontrado"})
            }

            const passoWordVerify = await bcrypt.compare(senha, user.senha);

            if(!passoWordVerify){
                return res.status(401).json({msg : "senha nao esta correta"});
            }

            const deleteQuery = `DELETE FROM usuarios WHERE email = ($1) AND id = ($2)`
            await pool.query(deleteQuery, [email,user.id])

            res.status(200).json({msg : "usuario excluido com sucesso"})

        }
        catch(erro){
            console.log(erro)
        }
    }


}


module.exports = controlerrs
