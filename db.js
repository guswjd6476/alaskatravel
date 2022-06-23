const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'us-cdbr-east-05.cleardb.net',
  user     : 'bc90b75175ae64',
  password : '9005f604',
  port : '3306',
  database : 'heroku_dd866450cc6f195',
  dateStrings : 'date'
});
 //리스트 전체 불러오기
function getAllMemos(callback){
    connection.query('select * from notice ORDER BY id DESC',(err, rows, fields) =>{
    if(err) throw err;
    callback(rows);
    })
}
function getAllQnas(callback){
  connection.query('select * from qna ORDER BY id DESC',(err, rows, fields) =>{
  if(err) throw err;
  callback(rows);
  })
}
function getAllQnaanss(callback){
  connection.query('select * from qnaans ORDER BY id DESC',(err, rows, fields) =>{
  if(err) throw err;
  callback(rows);
  })
}
function getAllreviews(callback){
  connection.query('select * from review ORDER BY id DESC',(err, rows, fields) =>{
  if(err) throw err;
  callback(rows);
  })
}


 //리스트에 새로운 내용 추가하는 함수
function insertMemo(content,title,writer,callback){
    connection.query(`INSERT INTO notice(content,created,updated,title,writer) VALUES("${content}",NOW(),NOW(),"${title}","${writer}")`,
    (err,result) =>{
      if(err) throw err;
    callback();
    })
}
function insertQna(content,title,writer,pass,callback){
  connection.query(`INSERT INTO qna(content,created,updated,title,writer,pass) VALUES("${content}",NOW(),NOW(),"${title}","${writer}","${pass}")`,
  (err,result) =>{
    if(err) throw err;
  callback();
  })
}
function insertQnaans(content,title,writer,callback){
  connection.query(`INSERT INTO qnaans(content,created,updated,title,writer) VALUES("${content}",NOW(),NOW(),"${title}","${writer}")`,
  (err,result) =>{
    if(err) throw err;
  callback();
  })
}
function insertreview(content,title,writer,callback){
  connection.query(`INSERT INTO review(content,created,updated,title,writer) VALUES("${content}",NOW(),NOW(),"${title}","${writer}")`,
  (err,result) =>{
    if(err) throw err;
  callback();
  })
}


 //리스트중 아이디값이 일치하는 row만 불러오는 함수
function getMemoById(id,callback){
  connection.query(`select * from notice WHERE id = ${id}`,(err, row, fields) =>{
    if(err) throw err;
    callback(row);
    })
}
function getQnaById(id,callback){
  connection.query(`select * from qna WHERE id = ${id}`,(err, row, fields) =>{
    if(err) throw err;
    callback(row);
    })
}

function getQnaansById(id,callback){
  connection.query(`select * from qnaans WHERE id = ${id}`,(err, row, fields) =>{
    if(err) throw err;
    callback(row);
    })
}

function getReviewById(id,callback){
  connection.query(`select * from review WHERE id = ${id}`,(err, row, fields) =>{
    if(err) throw err;
    callback(row);
    })
}

//리스트를 수정하고 싶을 때 id값이 일치하는 부분을 수정하는 함수 
function updateMemoById(id,content,title,writer, callback){
  connection.query(`UPDATE notice SET CONTENT='${content}', title = '${title}', writer = '${writer}', updated=NOW() WHERE ID=${id}`, (err, result) => {
    if(err) throw err;
    callback();
  })
}
function updateQnaById(id,content,title,writer,pass, callback){
  connection.query(`UPDATE qna SET CONTENT='${content}', title = '${title}', writer = '${writer}', pass = '${pass}',updated=NOW() WHERE ID=${id}`, (err, result) => {
    if(err) throw err;
    callback();
  })
}
function updateQnaansById(id,content,title,writer, callback){
  connection.query(`UPDATE qnaans SET CONTENT='${content}', title = '${title}', writer = '${writer}', updated=NOW() WHERE ID=${id}`, (err, result) => {
    if(err) throw err;
    callback();
  })
}
function updateReviewById(id,content,title,writer, callback){
  connection.query(`UPDATE notice SET CONTENT='${content}', title = '${title}', writer = '${writer}', updated=NOW() WHERE ID=${id}`, (err, result) => {
    if(err) throw err;
    callback();
  })
}



//리스트중 id값이 일치하는 부분을 삭제하는 함수
function deleteMemoById(id, callback){
  connection.query(`DELETE FROM notice WHERE id = ${id}`,(err, result) =>{
    if(err) throw err;
    callback();
    })
}
function deleteQnaById(id, callback){
  connection.query(`DELETE FROM qna WHERE id = ${id}`,(err, result) =>{
    if(err) throw err;
    callback();
    })
}
function deleteQnaansById(id, callback){
  connection.query(`DELETE FROM qnaans WHERE id = ${id}`,(err, result) =>{
    if(err) throw err;
    callback();
    })
}
function deleteReviewById(id, callback){
  connection.query(`DELETE FROM review WHERE id = ${id}`,(err, result) =>{
    if(err) throw err;
    callback();
    })
}


    module.exports = {
    getAllMemos,
    getAllQnas,
    getAllQnaanss,
    getAllreviews,
    insertMemo,
    insertQna,
    insertQnaans,
    insertreview,
    getMemoById,
    getQnaById,
    getQnaansById,
    getReviewById,
    updateMemoById,
    updateQnaById,
    updateQnaansById,
    updateReviewById,
    deleteMemoById,
    deleteQnaansById,
    deleteQnaById,
    deleteReviewById
}

