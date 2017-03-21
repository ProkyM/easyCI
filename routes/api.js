
var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('api is ready');
});
router.post('/exec', function(req, res, next) {
    var body = req.body;
    const cmd = body.cwd;
    //const thread = spawn('cmd.exe', ['/c',cmd/*, '/usr'*/]);
    const thread2 = exec(cmd);
    //console.log(ls)
    thread2.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    thread2.on('close', (code) => {
        let status = false;
        if(code == 0){
            status = true;
        }
        console.log(`child process exited with code ${code}`);
        var json = {success: status, exitCode: code};
        res.send(JSON.stringify(json));
    });
    thread2.on('error', (error) => {
        console.log(`Failed when executing ${cmd} with error ${error}`);
        res.send(JSON.stringify(json));
    });

});

module.exports = router;
