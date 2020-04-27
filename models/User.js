const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String },
  correo: { type: String },
  pass: {type: String},
});
/* NoteSchema.methods.truncateBody = function() {
  if (this.body && this.body.length > 75) {
    return this.body.substring(0, 70) + " ...";
  }
  return this.body;
}; */
module.exports = mongoose.model("User", UserSchema);
