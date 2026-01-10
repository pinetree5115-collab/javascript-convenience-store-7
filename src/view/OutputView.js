import { Console } from "@woowacourse/mission-utils";
import { MESSAGES } from "../constants/constants.js";

const OutputView = {
  printWelcome(products) {
    Console.print(MESSAGES.WELCOME);
    products.forEach((products) => {
      const { name, price, quantity, promotion } = products;
      const priceText = price.toLocaleString(); // 1000 -> 1,000
      const quantityText = quantity === 0 ? "품절" : `(${quantity}개 남음)`;
      const promotionText = promotion ? promotion : "";

      Console.print(`- ${name} ${priceText}원 ${quantityText} ${promotionText}`.trim());
    });
  },

  printError(message) {
    Console.print(message);
  },

  printReceipt(receiptData) {
    Console.print("\n==============W 편의점================");
    Console.print("상품명\t\t수량\t금액");

    // 1. 구매 내역 출력
    receiptData.items.forEach(item => {
      const totalPrice = (item.price * item.quantity).toLocaleString();
      Console.print(`${item.name}\t\t${item.quantity}\t${totalPrice}`);
    });

    // 2. 증정 내역 출력
    if (receiptData.giftItems.length > 0) {
      Console.print("=============증정===============");
      receiptData.giftItems.forEach(gift => {
        Console.print(`${gift.name}\t\t${gift.quantity}`);
      });
    }

    // 3. 금액 정보 출력
    Console.print("====================================");
    const totalQuantity = receiptData.items.reduce((sum, item) => sum + item.quantity, 0);
    Console.print(`총구매액\t\t${totalQuantity}\t${receiptData.totalAmount.toLocaleString()}`);
    Console.print(`행사할인\t\t\t-${receiptData.promotionDiscount.toLocaleString()}`);
    Console.print(`멤버십할인\t\t\t-${receiptData.membershipDiscount.toLocaleString()}`);
    Console.print(`내실돈\t\t\t ${receiptData.finalAmount.toLocaleString()}`);
  }
};

export default OutputView;