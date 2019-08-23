const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let data = [];
const mongoCilent = require("mongodb").MongoClient;
let errs = (err) => {
    if (err) { return err } else {
        return "success!";
    }
}
let dbo = null;

mongoCilent.connect("mongodb://localhost:27017/", (err, db) => {
    console.log(errs(err));
    dbo = db.db("messages");
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

    console.log('a user connected ');
    socket.on('disconnect', function() {
        console.log("Users Disconnect DKM !!");

    });

    socket.on('SEND_MESSAGE', function(msg) {
        console.log("~~" + msg + "~~");
        dbo.collection("MessageData").insertOne({
            avatar: msg.avatar,
            author: msg.author,
            message: msg.message,
            time: msg.time
        }, (err) => {
            errs(err);
        })


        io.emit('RECEIVE_MESSAGE', msg);
    });

    socket.on('Get Data', function(a) {
        console.log('====================================');
        console.log("get Data");
        console.log('====================================');
        dbo.collection("MessageData").find({}).toArray((err, data) => {
            errs(err);

            io.emit("Recive Data", data);

        })
    });

});

http.listen(4001, function() {
    console.log('listening on *:4001');
});