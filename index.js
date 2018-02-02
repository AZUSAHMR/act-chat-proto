var child_process = require("child_process");
var app =require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var basicAuth = require("basic-auth-connect");
var os = require("os");

app.use(basicAuth("azu", "kanoazuhontoutenshi"));

var wrapper = (name)=>{
	return child_process.spawnSync("python",["-c","import butler\nbutler."+name+"()"],{cwd: __dirname}).stdout.toString();
};

var copy = (data)=>{
	return child_process.spawnSync("python",["-c","import butler\nbutler.copy('"+data.replace(/'/g,"\\'")+"')"],{cwd: __dirname}).stdout.toString();
};

var paste = ()=>{
	wrapper("paste");
};

var enter = ()=>{
	wrapper("enter");
};

var sleep = (num)=>{
	return child_process.spawnSync("python",["-c","import butler\nbutler.sleep("+num+")"],{cwd: __dirname}).stdout.toString();
};

app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.html");
});

app.get("/act",(req,res)=>{
	res.sendFile(__dirname+"/act.html");
});

io.on("connection",(socket)=>{
	socket.on("log",(data)=>{
		io.sockets.emit("log",data);
	});

	socket.on("data",(data)=>{
		enter()
		copy(data);
		paste()
		enter()
	});
});

http.listen(4040);

var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach((ifname)=>{
	ifaces[ifname].forEach((iface)=>{
		console.log("http://"+iface.address+":4040");
	});
});