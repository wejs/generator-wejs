/**
 * AccessToken
 *
 * @module      :: Model
 * @description :: Auth Token model for create login, password and activate account tokens
 *
 */
var crypto = require('crypto');

module.exports = {
  schema: true,
  attributes: {

    userId: {
      type: 'string',
      required: true
    },

    providerUserId: {
      type: 'string'
    },

    tokenProviderId: {
      type: 'string'
    },


    token: {
      type: 'string'
    },

    tokenType: {
      type: 'string'
    },

    refreshToken: {
      type: 'string'
    },

    // consumer: {
    //   model: 'Consumer'
    // },

    isValid: {
      type: 'boolean',
      defaultsTo: true
    },
    toJSON: function() {

      var obj = this.toObject();

      delete obj.updaterAt;

      return obj;
    }
  },

  beforeCreate: function(token, next) {
    if (!token.token) {
      // generate the token string
      token.token = crypto.randomBytes(25).toString('hex');
    }

    next();
  },  

  /**
  * Check if a access token is valid
  */
  validAccessToken: function (userId, token, cb) {

    // then get user token form db
    AccessToken.findOneByToken(token).exec(function(err, accessToken) {
      if (err) {
        return cb('Error on get token', null);
      }

      // access token found then check if is valid
      if(accessToken){

        // user id how wons the access token is invalid then return false
        if(accessToken.userId !== userId || !accessToken.isValid){
          return cb(null, false,{
            result: 'invalid',
            message: 'Invalid token'
          });
        }

        // TODO implement expiration time

        // set this access token as used
        accessToken.isValid = false;
        accessToken.save(function(err){
          if (err) {
            // not valid with error
            return cb(err, false);
          }
          // accessToken is valid
          return cb(null, true, accessToken);
        });

      } else {
        // Access token not fount
        return cb('Access token not found', false, null);
      }

    });
  }

};