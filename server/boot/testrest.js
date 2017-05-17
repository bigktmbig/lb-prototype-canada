var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var ds = app.datasources.restimpact;
var _ = require("underscore");
var crypto = require('crypto');

module.exports = function() {
	var Event = ds.createModel('event', {
		title: String,
		content: String
	});

	var params_ex = {
		loginType: 1,
		email: "console.log.big@gmail.com",
		pwd: "11111111",
		rememberMe: false
	};

	var requestParameters = _.pick(params_ex, 'rememberme', 'email', 'pwd', 'loginType', 'socialId', 'accessToken', 'name', 'socialEmail');
	if (requestParameters.loginType == 1) {
		if (!requestParameters.notHash) {
			shaEnc = crypto.createHash('sha256');
			shaEnc.update(requestParameters.pwd);
			requestParameters.pwd = shaEnc.digest('base64');
		}
		requestParameters.deviceId = "web-" + requestParameters.email;
	} else {
		requestParameters.deviceId = "web-" + requestParameters.socialEmail;
	}
	if (requestParameters.rememberme) {
        var minute = 604800000; // 1 week
        requestParameters.notHash = true;
        res.cookie('hr_takana', JSON.stringify(requestParameters), {maxAge: minute});
    }

    Event.invoke({method: "POST", url: "http://dev.bunjee.io:8080/impact/v1/user/login", requestParameters: JSON.stringify(requestParameters)}, function (error, req, res) {
    	console.log(res);
		// Event.invoke({method: "GET", url: "http://dev.bunjee.io:8080/impact/v1/events/list", session: "8gI-jsY4vibtxYofHNjb4g"}, function (error, req, res) {
		// 	console.log(res.body);
		// });
	});
}