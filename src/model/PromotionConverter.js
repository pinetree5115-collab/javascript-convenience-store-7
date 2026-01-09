//데이터 및 로직을 맡은 부분(실제 계산기역할)
import { Random } from "@woowacourse/mission-utils";
import Store from "./Store.js";

class StoreMachine {
  #Stores = [];

  constructor(amount) {
    const count = amount / 1000;
    this.#issueStores(count);
  }

  #issueStores(count) {
    for (let i = 0; i < count; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      this.#Stores.push(new Store(numbers));
    }
  }

  getTickets() {
    return this.#Stores.map((Store) => Store.getNumbers());
  }
}

export default StoreMachine;