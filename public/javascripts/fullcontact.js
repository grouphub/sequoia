'use strict';

var FullContact = require('fullcontact');

//
// The constructors are directly exposed on the FullContact constructor:
//
FullContact.Location;
FullContact.Person;
FullContact.Email;
FullContact.Name;

//To create a new client you simply need to construct the module with your FullContact API key:

var fullcontact = new FullContact("a6810e0c84ec72d1");


//Alternatively you can also use the provided createClient method, is that's how you roll.

var fullcontact = FullContact.createClient("a6810e0c84ec72d1");

//
// Or just call it directly:
//
var fullcontact = require('fullcontact').createClient("a6810e0c84ec72d1");

//Retrieves contact information by e-mail address.

fullcontact.person.email('foo@bar.com', function (err, data) {
  ..
});

//Retrieves contact information by e-mail address but transforms the email to an MD5 first.



fullcontact.person.md5('foo@bar.com', function (err, data) {
  ..
});


//Retrieves contact information by Twitter username.

fullcontact.person.twitter('3rdEden', function (err, data) {
  ..
});

//Retrieves contact information by Facebook username.

fullcontact.person.facebook('john.smith', function (err, data) {
  ..
});


//Retrieves contact information by phone number.

fullcontact.person.phone('+13037170414', function (err, data) {
  ..
});