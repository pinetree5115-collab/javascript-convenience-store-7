import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import Validator from "../utils/Validator.js";
import ProductConverter from "../models/ProductConverter.js";

class StoreController {
  #inventory;

  constructor() {
    this.#inventory = ProductConverter.getProducts();
    // 초기 재고 로드
  }

  async run() {
    OutputView.printWelcome(this.#inventory);
    const orderInput = await this.#getValidOrder();

    //이후 결제 및 프로모션 로직으로 이어짐...
    console.log("검증된 주문:", orderInput);
  }

  async #getValidOrder() {
    try {
      const input = await InputView.readItem();
      const order = this.#parseInput(input);
      Validator.validateOrder(order, this.#inventory);

      return order;
    } catch (error) {
      OutputView.printError(error.message);
      return await this.#getValidOrder(); // 재귀 호출로 다시 입력받기(에러 발생시 재시작?)
    }
  }
  // 1. 파일 읽기 및 데이터 초기화 (Service 생성)
  // 2. 환영 인사 및 상품 목록 출력


  // 3. 상품 입력 받기
  // "[사이다-2],[콜라-1]" -> [{name: "사이다", quantity: 2}, ...] 
  #parseInput(input) {
    return input.split(',').map(item => {
      const [name, quantity] = item.replace(/[\[\]]/g, '').split('-');
      return { name, quantity: Number(quantity) };
    });
  }
}
// 4. Service를 통한 계산
// 5. 결과 출력 (영수증)
// 6. 추가 구매 여부 확인

export default StoreController;