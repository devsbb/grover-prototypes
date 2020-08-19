import MockUserApi from './apis/user';
import MockOrderApi from './apis/order';

export class MockApi {
  constructor() {
    this.userApi = new MockUserApi();
    this.orderApi = new MockOrderApi();
  }

  deleteUserData = async ({ userId }) => {
    const orders = (await this.userApi.getUser({ userId })).orders || [];
    await this.userApi.removeUser({ userId });
    await orders.map((orderNumber) =>
      this.orderApi.deleteOrder({ orderNumber })
    );

    return Promise.resolve({ user: { deleted: true } });
  };
}

export const mockApi = new MockApi();
