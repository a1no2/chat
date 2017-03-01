var socket = io.connect();
//emitはサーバーに渡す
socket.emit('message', {value: 'めっせーじ！！'});
//onで受け取る準備をする
socket.on('from_server', function(data){
	console.log(data.value);
	var list = document.getElementById("chatList");
	var str = document.createTextNode(data.value);
	var ls = document.createElement("li");
	ls.appendChild(str);
	list.insertBefore(ls, list.firstChild);
});