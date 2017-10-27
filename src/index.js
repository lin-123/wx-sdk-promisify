import wx from './promisify'
import register from './register'

window.wx = {register, ...wx}
export default {register, ...wx}
