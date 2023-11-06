module.exports = {
    version: '1.2.0',
    init: function (pluginContext) {
        let policy = require('./middleware-policy');
        pluginContext.registerPolicy(policy);
    },
    policies: ['middleware'],
    schema: {
        "$id":"http://express-gateway.io/schemas/policies/proxy.json"
    }
}