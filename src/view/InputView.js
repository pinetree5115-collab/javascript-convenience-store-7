import { Console } from "@woowacourse/mission-utils";

const InputView = {
  async readItem() {
    const input = await Console.readLineAsync("\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n");
    return input;
  },

  async readChoice(message) {
    const input = await Console.readLineAsync(`\n${message} (Y/N)\n`);
    return input.toUpperCase();
  }
};

export default InputView;