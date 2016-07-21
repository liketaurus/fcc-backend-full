 var net = require('net')
 var port = parseInt(process.argv[2]);

 var server = net.createServer(function(socket) {
     function addZeros(number) {
         if (number < 10)
             return number = '0' + number;
         else
             return number;
     }
     var date = new Date();
     var result = date.getFullYear() + '-' + addZeros(date.getMonth() + 1) + '-' + addZeros(date.getDate()) + ' ' + addZeros(date.getHours()) + ':' + addZeros(date.getMinutes());
     socket.end(result+'\n');
 })
 server.listen(port)