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
    }
    );
  },

  printError(message) {
    Console.print(message);
  }
};

export default OutputView;