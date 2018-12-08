var os = require('os');
module.exports = function () {
  var map = [];
  var ifaces = os.networkInterfaces();
  for (var dev in ifaces) {
	  if (dev.indexOf('本地连接') != -1) {
		  return ifaces[dev][1].address;
	  }
  }  
  return map;
};