var fs = require('fs');
var request = require('request');
var _ = require('underscore');
var Promise = require('bluebird');
var PokitDok = require('pokitdok-nodejs');

var config = require('./config');

function Plans () {
  this.zips = JSON.parse(fs.readFileSync(__dirname + '/../data/zips.json'));
  this.pokitdok = new PokitDok(config.pokitdokClientId, config.pokitdokClientSecret);
}

Plans.prototype.fetchPlans = function (zipcode) {
  var self = this;

  console.log('Fetching plans for zipcode "' + zipcode + '"');

  return new Promise(function (resolve, reject) {
    var zipData = self.zips[zipcode];
    var abbrev = zipData.abbrev;
    var county = zipData.county;
    var payload = {
      state: abbrev,
      county: county
    };

    console.log('Making a request to Pokitdok plans endpoint with payload ' + JSON.stringify(payload));

    self.pokitdok.plans(payload, function (err, res) {
      var i;
      var plan;

      if (err) {
        console.error('Pokitdok request failed with error', err);
        reject(err);
        return;
      }

      console.log('Pokitdok request succeeded');

      resolve(res.data);
    });
  });
}

Plans.prototype.fetchDoctors = function (zipcode, insuranceIds) {
  var self = this;

  console.log('Fetching doctors for zipcode "' + zipcode + '" and plan ids "' + insuranceIds.join(',') + '"');

  return new Promise(function (resolve, reject) {
    var zipData = self.zips[zipcode];
    var location = [zipData.latitude, zipData.longitude].join(',');
    var range = 50;
    var skip = 0;
    var limit = 100;
    var key = config.betterDoctorKey;
    var host = 'https://api.betterdoctor.com';
    var path = '/2014-09-12/doctors?' +
      'location=' + location + ',' + range + '&' +
      'skip=' + skip + '&' +
      'limit=' + limit + '&' +
      'user_key=' + key;
    var endpoint = host + path;

    console.log('Making a request to ' + endpoint);

    request(endpoint, function (err, response, body) {
      if (err) {
        console.error('Better Doctor request failed with error', err);
        reject(err);
        return;
      }

      console.log('Better Doctor request succeeded');

      resolve(JSON.parse(body).data);
    });
  });
};

Plans.prototype.fetch = function (zipcode) {
  var self = this;

  // For testing
  return new Promise(function (resolve, reject) {
    resolve(JSON.parse(fs.readFileSync(__dirname + '/../data/plans.json')));
  });

  return new Promise(function (resolve, reject) {
    console.log('Preparing to fetch plans...', zipcode);

    self
      .fetchPlans(zipcode)
      .then(function (plans) {
        var planIds = _(plans).map(function (plan) {
          return plan.plan_id;
        });

        console.log('Preparing to fetch doctors...', zipcode, planIds);

        self
          .fetchDoctors(zipcode, planIds)
          .then(function (doctors) {
            resolve({
              plans: plans,
              doctors: doctors
            });
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

// var plans = new Plans();
// plans
//   .fetch('95682')
//   .then(function (data) {
//     fs.writeFileSync('data.json', JSON.stringify(data));
//   })
//   .catch(function (err) {
//     console.error(err);
//   });

module.exports = Plans;

