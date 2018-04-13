const fetch = require('node-fetch');

module.exports = {
  mPlusAffixes: function (region) {
    return new Promise((resolve, reject) => {
      let url = 'https://raider.io/api/v1/mythic-plus/affixes?region=' + region + '&locale=en';
      fetch(url).then(res => res.text())
        .then(body => {
          resolve(JSON.parse(body).affix_details)
        });
    })

  },
  mPlusScore: function (region, realm, name) {
    return new Promise((resolve, reject) => {
      let url = 'https://raider.io/api/v1/characters/profile?region='+region+'&realm='+realm+'&name='+name+'&fields=mythic_plus_scores';
      fetch(url).then(res => res.text())
        .then(body => {
          if(JSON.parse(body).statusCode==400){
            reject('bad request');
          }
          resolve(JSON.parse(body).mythic_plus_scores)
        });
    })
  }
}