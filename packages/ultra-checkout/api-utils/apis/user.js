const isAllowed = async (name) => (await getAllowedUsers()).indexOf(name) > -1;
const getMaximumUsers = () => process.env.MAXIMUM_USERS || 3;

const getAllowedUsers = async () => {
  const allowedUsers = process.env.ALLOWED_USERS;
  if (!allowedUsers) return [];
  const users = allowedUsers.split(',').map((user) => user.toLowerCase());
  return users;
};

export default class MockUserApi {
  constructor() {
    this.users = {};
    this.maximumUsers = getMaximumUsers();
  }
  getUser = ({ userId }) => {
    const user = this.users[userId];

    return user;
  };

  rollUsers = async ({ used, name }) => {
    const [oldest, ...newer] = used.sort(([_, a], [i, b]) => {
      return a.createdAt - b.createdAt;
    });
    const [userId] = oldest;
    delete this.users[userId];
    return this.users;
  };
  createUser = async ({ name }) => {
    if (!name) throw new Error('needs to have a name');
    const allowed = isAllowed(name);
    if (!allowed) {
      Promise.reject('Restricted');
    }
    const users = Object.entries(this.users);
    const used = users.filter(([key, { username }]) => username === name);
    if (used.length > this.maximumUsers) {
      await this.rollUsers({ used, name });
    }
    const userId = this.generateUserId();
    const user = {
      id: userId,
      createdAt: Date.now().valueOf(),
      username: name,
      addresses: [],
    };
    this.users[userId] = user;
    return user;
  };

  generateUserId = () => {
    const ids = Object.keys(this.users);
    if (!ids.length) {
      return 0;
    }
    const latestId = ids
      .map((id) => parseInt(id, 10))
      .sort((a, b) => a - b)
      .pop();
    return latestId + 1;
  };

  removeUser = ({ userId }) => {
    delete this.users[userId];

    return Promise.resolve({ userId: { deleted: true } });
  };

  getAddresses = ({ userId }) =>
    Promise.resolve({ addresses: this.users[userId].addresses });
  addAddress = ({ userId, address }) => {
    try {
      const user = this.getUser({ userId });
      const addressId = Math.floor(Math.random() * (10000 - 2)) + 2;
      user.addresses.push({ id: addressId, ...address });
      this.users[userId] = user;
      return Promise.resolve({ addresses: this.users[userId].addresses });
    } catch (e) {
      console.error(e);
      return e;
    }
  };
  updateAddress = ({ userId, address }) => {
    const { id } = address;
    const user = this.getUser({ userId });
    const addresses = [...user.addresses];
    user.addresses = addresses.map((value) => {
      if (value.id !== id) return value;
      return { ...value, ...address };
    });
    this.users[userId] = user;
    return Promise.resolve({ addresses: this.users[userId].addresses });
  };
}
