var sinchAuth = require('sinch-auth');

var sinchSms = require('sinch-messaging');

var auth = sinchAuth("3b82c382-1a34-41cb-bf38-42eba9d8d7e4"", "s9wKLFx5UUWQ0Py+Vgj5Cg==");

sinchSms.sendMessage("+14159882111", "I want an appointment now!");