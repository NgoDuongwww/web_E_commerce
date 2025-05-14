class ResponseUser {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    this.role = user.role;
    this.avatar = user.avatar;
    this.phone = user.phone;
    this.isLocked = user.isLocked;
    this.password_changed_at = user.password_changed_at;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

module.exports = ResponseUser;
