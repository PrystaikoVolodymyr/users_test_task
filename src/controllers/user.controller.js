const userService = require("../services/user.service");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async addUser(req, res) {
    try {
      const { name, email } = req.body;
      const id = uuidv4();

      if (!name || !email) {
        throw Error("No requaried fields: name or email");
      }

      const users = await userService.getUsersFromFile();

      const newUser = { id, name, email };
      users.push(newUser);

      await userService.saveUsersToFile(users);

      res.status(201).json(newUser);
    } catch (e) {
      res.status(400).json(e.message);
    }
  },

  async getUsers(req, res) {
    try {
      const users = await userService.getUsersFromFile();

      res.status(201).json(users);
    } catch (e) {
      res.status(400).json(e.message);
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      res.status(201).json(user);
    } catch (e) {
      res.status(400).json(e.message);
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;

      const users = await userService.getUsersFromFile();
      const userIndex = await userService.getUserIndex(id);

      if (userIndex === -1) {
        throw Error("No user to update");
      }
      if (req.body?.name) {
        users[userIndex].name = req.body?.name;
      }
      if (req.body?.email) {
        users[userIndex].email = req.body?.email;
      }

      await userService.saveUsersToFile(users);
      res.status(201).json(users[userIndex]);
    } catch (e) {
      res.status(400).json(e.message);
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const users = await userService.getUsersFromFile();
      const userIndex = await userService.getUserIndex(id);

      if (userIndex === -1) {
        throw Error("No user to delete");
      }
      const deletedUser = users.splice(userIndex, 1)[0];

      await userService.saveUsersToFile(users);
      res.status(201).json(deletedUser);
    } catch (e) {
      res.status(400).json(e.message);
    }
  },
};
