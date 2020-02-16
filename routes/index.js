var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var statusFilePath = path.resolve('statusFile.json')

function checkExists(exists) {
    if (!exists) {
        fs.writeFileSync(statusFilePath, JSON.stringify({status: true}, null, 2), {flag: 'wx'})
    }
}

fs.exists(statusFilePath, checkExists)


function toggleStatus() {
    var statusFile = fs.readFileSync(statusFilePath)
    var parsedStatus = JSON.parse(statusFile)
    var newStatus = {
        status: !parsedStatus.status
    }
    var stringifiedStatus = JSON.stringify(newStatus, null, 2)
    console.log(newStatus)
    fs.writeFileSync(statusFilePath, stringifiedStatus)
}

function getStatus() {
    var statusFile = fs.readFileSync(statusFilePath)
    var parsedStatus = JSON.parse(statusFile)
    return parsedStatus.status
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {status: getStatus()});
});

/* POST update status */
router.post('/toggle', function (req, res) {
    toggleStatus()
    res.redirect('/')
})

module.exports = router;

