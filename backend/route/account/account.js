const express = require("express");
const router = express.Router();
const Account = require("../../db/account/account.js");

router.post("/join", (req,res) => {
    
    let idRegex = /^[a-zA-Z0-9]+$/;

    if(!idRegex.test(req.body.id)){
        return res.status(400).json({
            error : "ID Format is Bad.",
            code : 1
        });
    };
    
    if(req.body.password.length < 4){
        return res.status(400).json({
            error : "Password Length is Bad.",
            code : 2
        });
    };

    Account.findOne( { id : req.body.id }, ( err, exist ) => {
        if(err){ throw err };
        if(exist){
            return res.status(409).json({
                error : "Exists ID",
                code : 3
            });
        } else {
            Account.findOne( { nickname : req.body.nickname }, (err, exist) => {
                if(err) {throw err};
                if(exist){
                    return res.status(409).json({
                        error : "Nickname is Exist",
                        code : 4
                    })
                }else{
                    let account = new Account({
                        id : req.body.id,
                        password : req.body.password,
                        nickname : req.body.nickname
                    });
                
                    account.password = account.generateHash(account.password);
                
                    account.save( (err) => {
                        if(err) throw err;
                        return res.json({ success: true});
                    });
                };
            })         
        }
    });


});

router.post("/login", (req, res) => {
    if(typeof req.body.password !== "string"){
        return res.status(401).json({
            error : "Password is not string",
            code : 4
        })
    };

    Account.findOne({ id : req.body.id }, (err, account) => {
        if(err) throw err;
        if(!account){
            return res.status(401).json({
                error: "ID is not exist",
                code : 5
            });
        } 
        else{
            if(!account.validateHash(req.body.password)){
                return res.status(401).json({
                    error : "Password is Wrong",
                    code : 6
                })
            } 
            else {

                let session = req.session;
                session.loginInfo = {
                    nickname : account.nickname
                };

                return res.json({
                    success: true,
                    nickname : account.nickname
                });
            }
        }  
})});

router.get("/getinfo", (req, res) => {
    if(typeof req.session.loginInfo === "undefined"){
        return res.status(401).json({
            error : 1
        })
    }

    res.json({
        info : req.session.loginInfo
    });
    
});

router.post("/logout", (req, res) => {
    req.session.destroy(error => {
        if(error) throw error;
    });

    return res.json({
        success : true
    });
});

module.exports = router;