const {Router} = require('express');
const {check} = require('express-validator')
const {getUsers,postUsers,deleteUsers,putUsers,patchUsers} = require('../controllers/Usuario.controllers.js');
const { validateDocuments } = require('../middlewares/validate.documents.js');

const Role = require('../models/Role.js');    
const router = Router();

router.get("/",getUsers);
router.post("/",[
    check('nombre','nombre no es valido').not().isEmpty(),
    check('password','password debe de ser minimo 6 letras').isLength({min:6}),
    check('email','el correo no es valido').isEmail(),
/*     check('rol','no es un rol valido').isIn(['ADMIN','USER']),*/
    check('rol').custom(async(rol='')=>{
        const exitesRol = await Role.findOne({rol});
        if(!exitesRol){
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
        }
    }),
     validateDocuments
],postUsers);
router.delete("/",deleteUsers);
router.put("/",putUsers);
router.patch("/",patchUsers);


module.exports = router;