import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import Validator from "../utils/Validator.js";
import ProductConverter from "../models/ProductConverter.js";

class StoreController {
  #products;   // 전체 상품 목록 (재고)
  #promotions; // 전체 프로모션 정보
  #service;    // 로직을 담당하는 StoreService 인스턴스

  constructor(products, promotions, service) {
    this.#products = products;
    this.#promotions = promotions;
    this.#service = service;
  }

  async run() {
    // [반복 시작] 추가 구매 여부에 따라 루프가 돌아야 하므로 여기에 while을 둡니다.
    while (true) {
      // 1. 환영 인사 및 상품 목록 출력
      OutputView.printWelcome(this.#products);
      // 2. 유효한 주문 입력 받기 (반복 로직 포함된 메서드)
      const orderInput = await this.#getValidOrder();
      // 3. 주문 처리 프로세스 시작
      const receiptItems = await this.processOrder(orderInput);
      // 4. 멤버십 할인 여부 입력
      const hasMembership = await InputView.readMembershipDiscount();
      // 5. 최종 금액 계산
      const receiptData = this.calculateFinalAmount(receiptItems, hasMembership);
      // 6. 영수증 출력
      OutputView.printReceipt(receiptData);
      // 7. 추가 구매 여부 확인
      const continuesShopping = await InputView.readAdditionalPurchase();
      if (!continuesShopping) break;
    }
  }

  async processOrder(orderInput) {
    const receiptItems = []; // 영수증에 들어갈 항목들

    for (const orderItem of orderInput) {
      const product = this.#products.find(p => p.name === orderItem.name);
      const promotion = this.#service.findPromotion(product.promotion, this.#promotions);

      let finalQuantity = orderItem.quantity;
      let bonusQuantity = 0;

      //프로모션이 활성화된 상태라면 계산 진행
      if (promotion && this.#service.isPromotionActive(promotion)) {
        const { bonus, fullPriceQuantity } = this.#service.calculatePromotion(product, promotion, orderItem.quantity);

        //[질문1] 증정품 추가 여부
        if (bonus > 0) {
          const answer = await InputView.readConfirmation(orderItem.name, bonus);
          if (answer) {
            finalQuantity += bonus;
            bonusQuantity = bonus;
          }
        }
        //[질문2] 정가 결제 진행 여부
        else if (fullPriceQuantity > 0) {
          const answer = await InputView.readFullPriceConfirmation(orderItem.name, fullPriceQuantity);
          if (answer === 'N') {
            finalQuantity -= fullPriceQuantity;
          }

          //보너스는 이미 세트만큼 가져온 수량 안에서 계산
          const setSize = promotion.buy + promotion.get;
          bonusQuantity = Math.floor(finalQuantity / setSize) * promotion.get;
        } else {
          //질문이 필요 없는 경우의 보너스 계산
          const setSize = promotion.buy + promotion.get;
          bonusQuantity = Math.floor(finalQuantity / setSize) * promotion.get;
        }
      }

      //[결과 반영] 재고 차감 및 영수증 항목 추가
      this.#service.updateStock(this.#products, orderItem.name, finalQuantity);

      receiptItems.push({
        name: orderItem.name,
        quantity: finalQuantity,
        bonus: bonusQuantity,
        price: this.#findProductPrice(orderItem.name)
      });
    }

    return receiptItems;
  }

  async #getValidOrder() {
    try {
      const input = await InputView.readItem();
      const order = this.#parseInput(input);
      Validator.validateOrder(order, this.#products);

      return order;
    } catch (error) {
      OutputView.printError(error.message);
      return await this.#getValidOrder(); // 재귀 호출로 다시 입력받기
    }
  }
  // "[사이다-2],[콜라-1]" -> [{name: "사이다", quantity: 2}, ...] 
  #parseInput(input) {
    return input.split(',').map(item => {
      const [name, quantity] = item.replace(/[\[\]]/g, '').split('-');
      return { name, quantity: Number(quantity) };
    });
  }
  #findProductPrice(name) {
    const product = this.#products.find(p => p.name === name);
    return product ? product.price : 0;
  }
  calculateFinalAmount(receiptItems, hasMembership) {
    let totalAmount = 0;        // 총구매액
    let promotionDiscount = 0;  // 행사 할인
    let membershipDiscount = 0; // 멤버십 할인
    const giftItems = [];        // 증정 상품 목록

    // 1. 총구매액 및 행사 할인 계산
    receiptItems.forEach(item => {
      totalAmount += item.price * item.quantity;

      if (item.bonus > 0) {
        promotionDiscount += item.price * item.bonus;
        giftItems.push({ name: item.name, quantity: item.bonus });
      }
    });

    // 2. 멤버십 할인 계산 (프로모션 미적용 금액의 30%, 최대 8,000원)
    if (hasMembership) {
      receiptItems.forEach(item => {
        // 프로모션이 적용되지 않은 수량 = 총 수량 - 보너스 수량
        const nonPromotionQuantity = item.quantity - item.bonus;
        const nonPromotionAmount = item.price * nonPromotionQuantity;
        membershipDiscount += nonPromotionAmount * 0.3;
      });
      membershipDiscount = Math.min(membershipDiscount, 8000);
    }

    // 3. 최종 금액 계산
    const finalAmount = totalAmount - promotionDiscount - membershipDiscount;

    return {
      items: receiptItems,
      giftItems: giftItems,
      totalAmount: totalAmount,
      promotionDiscount: promotionDiscount,
      membershipDiscount: Math.floor(membershipDiscount),
      finalAmount: finalAmount
    };
  }
}
export default StoreController;