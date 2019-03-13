/**
 * @param {Function} f 校验函数
 * @return <Object> mongoose.Schema.validate
 * */
 const definedValidate = (f) => {
  return {
    validator(v) {
      return f(v)
    },
    message(props) {
      if(props.reason && props.reason.message){
        return props.reason.message
      }
      return `${props.path} = ${props.value} : Format error`
    }
  }
}

module.exports = definedValidate
