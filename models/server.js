const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config.js')
class Server{
    constructor(){
        this.app = express();

        this.port = process.env.PORT
        this.usuariosPath = "/api/usuarios";
        //Conectar base de datos
        this.connectDB();
        //Middlewares
        this.middlewares();
        //Routes                    
        this.routes();

    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //leer y parcear un JSON en BODY
        this.app.use(express.json());
        //public directory
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuario.routes.js'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`SERVER IS RUNNING ON PORT${this.port}`);
        })
    }

}

module.exports = Server