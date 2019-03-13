const path = require('path')
const VALIDA_ERR_MSG = '{PATH} = {VALUE} : Format error'
const STATIC_PATH = path.join( process.cwd(), 'static' )
const STATIC_IMG_PATH = path.join( STATIC_PATH, 'images' )

module.exports = VALIDA_ERR_MSG
module.exports = STATIC_PATH
module.exports = STATIC_IMG_PATH
