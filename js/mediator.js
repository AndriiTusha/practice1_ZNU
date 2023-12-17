class Mediator {
  constructor() {
    this.users = {};
  }
  register(user) {
    this.users[user.name] = user;
    user.field = this;
  }

  send(message, from, to) {
    if (to) {
      to.receive(message, from)
    } else {
      Object.keys(this.users).forEach(key => {
        if (this.users[key] !== from) {
          this.users[key].receive(message, from)
        }
      })
    }
  }
}
