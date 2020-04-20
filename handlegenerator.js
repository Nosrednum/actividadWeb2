let jwt     = require("jsonwebtoken");
let config  = require("./config");
const md5   = require('md5')
const db    = require("./db");

class HandlerGenerator {
  login(req, res) {
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    const {username} = req.body;
    let password = md5(req.body.password)

    db.getDatabase((db) => {
      db.findUser(db, user => {
          let usrnm = user.username;
          let psswrd = user.password;
          let role = user.role;
          if (username && password)
            if (username === usrnm && password === psswrd) {
              let token = jwt.sign({ username , role }, config.secret, { expiresIn: "1h",});
              res.json({success: true, message: "successful", token,});
            } else res.send('Element not found').status(400);  
          else res.send("Element not found").status(400);
        },
        username,
        password
      );
    });
  }

  index(req, res) {
    db.getDatabase(db=> db.findDocuments(db, usuarios=>{res.json(usuarios)}));
  }

  createUser(req, res){
    db.getDatabase(db => { let user = {username: req.body.username, password : md5(req.body.password), role:req.body.role}
      db.createUser(db,user);
      res.json({success: true, message: "Successfully created!" });
    });
  }
}

module.exports = HandlerGenerator;