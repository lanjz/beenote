const middleware = {}

middleware['anonymous'] = require('@/middleware/anonymous.js');
middleware['anonymous'] = middleware['anonymous'].default || middleware['anonymous']

middleware['authenticated'] = require('@/middleware/authenticated.js');
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['check-auth'] = require('@/middleware/check-auth.js');
middleware['check-auth'] = middleware['check-auth'].default || middleware['check-auth']

export default middleware
