const express = require("express");
const router = express.Router();
const Memo = require("../../db/memo/memo.js");

router.post("/", (req, res) => {
    if(typeof req.session.loginInfo === "undefined"){
        return res.status(401).json({
            error : "Not Logged In",
            code : 1
        });
    };

    if(typeof req.body.contents !== "string"){
        return res.status(403).json({
            error : "Contents is Empty",
            code : 2
        })
    };

    if(req.body.contents === ""){
        return res.status(403).json({
            error : "Contents is Empty",
            code : 3
        })
    };

    let memo = new Memo({
        writer : req.session.loginInfo.nickname,
        contents : req.body.contents
    });

    memo.save((err) => {
        if(err) throw err;
        return res.json({
            success : true
        })
    })
})

router.get("/", (req, res) => {
    Memo.find()
    .sort({"_id" : -1})
    .limit(6)
    .exec((err, memos) => {
        if(err) {console.log("오류"); throw err;}
        return res.json(memos);
    });
});

router.get("/:listType/:id", (req, res) => {
    let listType = req.params.listType;
    let id = req.params.id;

    if(listType !== "old" && listType !== "new"){
        return res.status(400).json({
            error : "INVALID LISTTYPE",
            code : 1
        });
    };

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            error : "INVALID ID",
            code : 2
        });
    };

    let objId = new mongoose.Types.ObjectId(req.params.id);

    if(listType === "new"){
        Memo.find({_id : { $gt : objId}})
        .sort({_id : -1})
        .limit(6)
        .exec((err, memos) => {
            if(err) throw err;
            return res.json(memos);
        });
    } else {
        Memo.find({_id : {$lt: objId}})
        .sort({_id : -1})
        .limit(6)
        .exec((err, memos) => {
            if(err) throw err;
            return res.json(memos);
        });
    };
});

module.exports = router;