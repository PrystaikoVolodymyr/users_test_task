const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

module.exports = {
  async getUsersFromFile() {
    try {
      const usersData = fs.readFileSync(usersFilePath);
      return JSON.parse(usersData);
    } catch (e) {
      throw Error("Check users data file path");
    }
  },

  async saveUsersToFile(users) {
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (e) {
      throw Error("Check users data file path");
    }
  },

  async getUserById(id) {
    try {
      const users = await this.getUsersFromFile();
      return users.find((user) => user.id === id);
    } catch (e) {
      throw Error(e.message);
    }
  },

  async getUserIndex(id) {
    try {
      const users = await this.getUsersFromFile();
      return users.findIndex((user) => user.id === id);
    } catch (e) {
      throw Error(e.message);
    }
  },
};
