const { USER_PATCH_INCORRECT_AVATAR_ERROR } = require('./errors');

class UserUpdateAvatarError extends Error {
  constructor() {
    super(USER_PATCH_INCORRECT_AVATAR_ERROR);
    this.code = 400;
  }
}
module.exports = UserUpdateAvatarError;
