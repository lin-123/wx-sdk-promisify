import wx from './promisify'
import register from './register'

wx.register = register
module.exports = wx
