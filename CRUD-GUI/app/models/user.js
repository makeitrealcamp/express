var mongoose     = require('mongoose')
var Schema       = mongoose.Schema
var bcrypt       = require('bcrypt')
var SALT_WORK_FACTOR = 10

var UserSchema   = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean
})

UserSchema.pre('save', function(next) {
  var user = this;

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })

})

UserSchema.methods.comparePassword = function(candidatePassword) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return err
    return isMatch
  })
}

module.exports = mongoose.model('User', UserSchema)
