import { ERRORS } from "../constants/constants.js";

class OrderProduct {
  #name;
  #quantity;

  constructor(name, quantity) {
    this.#validate(name, quantity);
    this.#name = name;
    this.#quantity = Number(quantity);
  }

  #validate(name, quantity) {
    // 상품명이 비어있는지 확인
    if (!name || name.trim() === "") {
      throw new Error(ERRORS.INVALID_FORMAT);
    }
    // 수량이 1 미만이거나 숫자가 아닌 경우 확인
    if (isNaN(quantity) || Number(quantity) < 1) {
      throw new Error(ERRORS.INVALID_INPUT);
    }
  }

  getName() {
    return this.#name;
  }

  getQuantity() {
    return this.#quantity;
  }

  // 나중에 영수증 출력 시 편의를 위해 객체 형태로 반환하는 메서드
  toObject() {
    return {
      name: this.#name,
      quantity: this.#quantity,
    };
  }
}

export default OrderProduct;