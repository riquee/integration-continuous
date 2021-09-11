const { create, getAll: listMessages } = require('../models/Messages');

module.export = class Messages {
  static serialize({ nickname, message, date }) {
    return `${date} - ${nickname}: ${message}`;
  }

  static async createMessage(message) {
    await create(message);
  }

  static async getAll() {
    const messages = await listMessages();
    return messages.map(this.serialize);
  }
};