var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var route = express.Router();

const {check, validationResult} = require('express-validator');

const db = require('./../db.js');

route.use(expressLayouts);
//route 라우트
route.get('/', (req, res) => {
    res.render('main');
})
route.get('/login', (req, res) => {
    res.render('./sub/login');
})
route.get('/join', (req, res) => {
    res.render('./sub/mem1');
})
route.get('/join1', (req, res) => {
    res.render('./sub/mem2');
})
route.get('/intro', (req, res) => {
    res.render('./sub/sub_intro');
})
route.get('/intro_all', (req, res) => {
    res.render('./sub/alaska_all');
})
route.get('/intro_noted', (req, res) => {
    res.render('./sub/sub_intro_noted');
})
route.get('/weather_trip', (req, res) => {
    res.render('./sub/sub_weather_trip');
})
route.get('/partner_trip', (req, res) => {
    res.render('./sub/sub_partner_trip');
})
route.get('/thema_trip', (req, res) => {
    res.render('./sub/sub_thema_trip');
})
route.get('/info_trip', (req, res) => {
    res.render('./sub/alaska_trip_info');
})
route.get('/info_trip_review', (req, res) => {
    db.getAllQnas((rows) => {
        res.render('./sub/alaska_trip_review',{rows : rows})
    }
)
})
route.get('/trip_review_write', (req, res) => {
    res.render('./sub/alaska_trip_review_write');
})



route.get('/youtube', (req, res) => {
    res.render('./sub/sub_commu_yotube');
})


route.get('/qna_page1', (req, res) => {
    res.render('./sub/alaska_Q&A_page1');
})
route.get('/trip_review_page', (req, res) => {
    res.render('./sub/alaska_trip_review_page');
})
route.get('/weather_trip_more', (req, res) => {
    res.render('./sub/sub_weather_trip_more');
})
route.get('/partner_trip_more', (req, res) => {
    res.render('./sub/sub_partner_trip_more');
})


//리스트 페이지 ejs
route.get('/qna', (req, res) => {
    db.getAllQnas((rows) => {
        res.render('./sub/alaska_Q&A',{rows : rows});
    })
})
route.get('/notice', (req, res) => {
    db.getAllMemos((rows) => {
        res.render('./sub/alaska_notice',{rows : rows})
    }
)
})


//상세페이지 ejs
route.get('/notice_page', (req, res) => {
    let id = req.query.id;
    db.getMemoById(id,(row)=>{
        if(typeof id == 'undefined' || row.length <= 0){
            res.status(404).json({error:'undefined memo'})

        }else{
            res.render('./sub/alaska_notice_page',{row:row[0]})
        }
    })
})
route.get('/qna_page', (req, res) => {
    let id = req.query.id;
    db.getQnaById(id,(row)=>{
        if(typeof id == 'undefined' || row.length <= 0){
            res.status(404).json({error:'undefined memo'})

        }else{
            res.render('./sub/alaska_Q&A_page',{row:row[0]})
        }
    })
})





//글쓰기 ejs
route.get('/newM',(req,res) => {
    res.render('./sub/newM')
})
route.get('/qna_write', (req, res) => {
    res.render('./sub/alaska_Q&A_write');
})

//store로 보내는 새로운 글쓰기
route.post('/store', check('content').isByteLength({min : 1, max : 65535}),check('title').isByteLength({min : 1, max : 300}),
    function(req,res, next){
        let errs = validationResult(req);
        console.log(errs)
        if(errs['errors'].length>0){
            res.render('/notice',{errs:errs['errors']});
        }else{
            let param = JSON.parse(JSON.stringify(req.body));
            db.insertMemo(param['content'],param['title'],param['writer'], ()=>{
                res.redirect('/notice');
            })
        }
    });

route.post('/storeqna', check('content').isByteLength({min : 1, max : 65535}),check('title').isByteLength({min : 1, max : 300}),
    function(req,res, next){
        let errs = validationResult(req);
        console.log(errs)
        if(errs['errors'].length>0){
            res.render('/qna',{errs:errs['errors']});
        }else{
            let param = JSON.parse(JSON.stringify(req.body));
            db.insertQna(param['content'],param['title'],param['writer'],param['pass'], ()=>{
                res.redirect('/qna');
            })
        }
    });






route.get('/updateMemo',(req,res) => {
    let id = req.query.id;

    db.getMemoById(id,(row)=>{
        if(typeof id == 'undefined' || row.length <= 0){
            res.status(404).json({error:'undefind memo'})

        }else{
            res.render('./sub/updateMemo',{row:row[0]})
        }
    })
})
route.get('/updateMemoQna',(req,res) => {
    let id = req.query.id;

    db.getQnaById(id,(row)=>{
        if(typeof id == 'undefined' || row.length <= 0){
            res.status(404).json({error:'undefind memo'})

        }else{
            res.render('./sub/updateMemoQna',{row:row[0]})
        }
    })
})

route.post('/updateMemo',[check('content').isByteLength({min : 1, max : 65535})],
(req,res)=>{
    let errs = validationResult(req);
    let param = JSON.parse(JSON.stringify(req.body));
    let id = param['id'];
    let content = param['content'];
    let title = param['title'];
    let writer = param['writer'];
    if(errs['errors'].length>0){
        db.getMemoById(id,(row)=>{
            res.render('updateMemo',{row:row[0],errs:errs['errors']})
        })
    }else{
        db.updateMemoById(id, content,title,writer,()=>{
            res.redirect('notice');
        })
    }
})
route.post('/updateMemoQna',[check('content').isByteLength({min : 1, max : 65535})],
(req,res)=>{
    let errs = validationResult(req);
    let param = JSON.parse(JSON.stringify(req.body));
    let id = param['id'];
    let content = param['content'];
    let title = param['title'];
    let writer = param['writer'];
    let pass = param['pass'];
    if(errs['errors'].length>0){
        db.getQnaById(id,(row)=>{
            res.render('updateMemoQna',{row:row[0],errs:errs['errors']})
        })
    }else{
        db.updateQnaById(id, content,title,writer,pass,()=>{
            res.redirect('qna');
        })
    }
})

route.get('/deleteMemo',(req,res)=>{
    let id = req.query.id;
    db.deleteMemoById(id,()=>{
        res.redirect('notice');
    });
});

route.post('/register',(req,res,next)=>{
    const param = [req.body.id, req.body.pw, req.body.name];
    db.query('INSERT INTO member(`id`,`pw`,`name`) VALUES(?,?,?)',param,(err,row)=>{
        if(err) console.log(err)
    })
    console.log(req.body)
    res.end
})

module.exports = route;