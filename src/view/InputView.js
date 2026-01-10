import { Console } from "@woowacourse/mission-utils";

const InputView = {
  async readItem() {
    const input = await Console.readLineAsync("\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n");
    return input;
  },

  async readChoice(message) {
    const input = await Console.readLineAsync(`\n${message} (Y/N)\n`);
    return input.toUpperCase();
  },

  async readMembershipDiscount() {
    const input = await Console.readLineAsync("\n멤버십 할인을 받으시겠습니까? (Y/N)\n");
    return input.toUpperCase() === 'Y';
  },

  async readAdditionalPurchase() {
    const input = await Console.readLineAsync("\n감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n");
    return input.toUpperCase() === 'Y';
  }
};

export default InputView;