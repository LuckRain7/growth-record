/*
 *  Description:  
 *  Author: LuckRain7
 *  Date: 2020-06-29 16:10:33
 */


function _deepClone(_obj) {

    if (_obj === null) return null
    if (typeof _obj !== 'object') return _obj
    if (_obj instanceof Data) return new Data(_obj)
    if (_obj instanceof RegExp) return new RegExp(_obj)

    let newObj = new _obj.constructor
    for (key in _obj) {
        if (_obj.hasOwnProperty(key)) {
            newObj[key] = _deepClone(_obj[key])
        }
    }

    return newObj
}