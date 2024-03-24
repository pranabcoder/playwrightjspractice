class APIUtils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }
  async getTokens() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.loginPayLoad,
      }
    );
    const loginResponseJson = await loginResponse.json();
    const loginToken = loginResponseJson.token;
    return loginToken;
  }
  async createOrder(orderPayLoad) {
    let response = {};
    response.token = await this.getTokens();
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayLoad,
        headers: {
          Authorization: this.getTokens(),
          ContentType: 'application/json',
        },
      }
    );
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderId = orderResponseJson.orderId;
    response.orderId = orderId;
    return response;
  }
}
module.exports = { APIUtils };
