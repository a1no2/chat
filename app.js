const http = require('http');
const server = http.createServer();
const fs = require('fs');
const socketio = require('socket.io');		//読み込む

const io = socketio.listen(server);			//サバとioの紐づけ
io.sockets.on('connection', function (socket){
	console.log(socket);
	//イベント登録
	//messageが飛んで来たら・・・
	socket.on('message', function(data){
		io.sockets.emit('from_server', {value: data.value});
	});
});

//ほぼday2のコピペ
server.on('request', function(req, res) {
	fs.readFile(__dirname + '/client/index.html', 'utf-8', function(err, data){

		//ページがな無いとき
		if(err){
			res.writeHead(404, {'Content-Type' : 'text/plain'});
			res.write("page not found!!!");
			// res.end(fs.readFileSync(__dirname + "/client/index/.html", [options]));
			return res.end();

		}
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.write(data);
		res.end();
	});
});


const port = 3000;
server.listen(port, function(){
	console.log('serber runing no port' + port);
});

