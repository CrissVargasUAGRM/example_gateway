const axios = require('axios');

module.exports = {
    name: 'middleware',
    schema: {
        $id: 'http://express-gateway.io/schemas/policies/proxy.json',
        type:  'object',
        properties: {
            baseUrl: {
                type: 'array',
                format: 'url',
                default: ['https://example.com']
            }
        }
    },
    policy: (actionParams) => {
        const that = this;
        return async(req, res, next) => {
            const responseUsers = await axios.get(actionParams.baseUrl[0]);
            const responsePost = await axios.get(actionParams.baseUrl[1]);

            let usersArray = [];

            responseUsers.data.forEach((elementUser) => {
                const userData = {
                    id: elementUser.id,
                    name: elementUser.name,
                    username: elementUser.username,
                    email: elementUser.email,
                    post: []
                };

                responsePost.data.forEach((elementPost) => {
                    if(elementUser.id == elementPost.userId){
                        const post = {
                            id: elementPost.id,
                            title: elementPost.title,
                            body: elementPost.body
                        };
                        userData.post.push(post);
                    }
                });
                usersArray.push(userData);
            });
            
            res.status(200).send(usersArray);
            next();
        }
    }
}