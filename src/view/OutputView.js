import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printWelcome(products) {
    Console.print("\n안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n");
    products.forEach(p => {
      const stock = p.quantity === 0 ? "재고 없음" : `${p.quantity}개`;
      const promo = p.promotion ? p.promotion : "";
      Console.print(`- ${p.name} ${p.price.toLocaleString()}원 ${stock} ${promo}`);
    });
  },

  printError(message) {
    Console.print(message);
  }
};

export default OutputView;