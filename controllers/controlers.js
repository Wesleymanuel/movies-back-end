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


    atualizacao : async (req,res) => {

        const { name } = req.body;

        try{
            const query = `UPDATE usuarios SET nome = $1  WHERE id = 1`
            await pool.query(query, [name])
            res.status(201).json({msg : "nome atualizado com sucesso"})
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
            
                res.status(200).json({
                        msg: 'Login realizado com sucesso',
                        user: { id: user.id},
                        token ,
                    });
            
        }

        catch(error){
            console.log(error)
        }
    }
}

module.exports = controlerrs