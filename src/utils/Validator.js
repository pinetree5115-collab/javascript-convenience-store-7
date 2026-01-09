import { ERROR_MESSAGES } from "../constants/Messages.js";

const Validator = {
  validatePurchaseAmount(amount) {
    if (isNaN(amount) || amount.trim() === "") throw new Error(ERROR_MESSAGES.NOT_NUMBER);
    if (Number(amount) % 1000 !== 0) throw new Error(ERROR_MESSAGES.INVALID_UNIT);
  },
};

export default Validator;