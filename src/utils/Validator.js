import { ERRORS } from "../constants/constants.js";

const Validator = {
  // [상품명-수량],[상품명-수량] 형식 검사
  validateProductFormat(input) {
    const regex = /^(\[[가-힣a-zA-Z0-9]+-[0-9]+\])(,\[[가-힣a-zA-Z0-9]+-[0-9]+\])*$/;
    if (!regex.test(input.trim())) {
      throw new Error(ERRORS.PINVALID_FORMAT);
    }
  },

  // 파일 전체 내용이 비어있는지 검사
  validatorFileData(data) {
    if (!data || data.trim() === "") {
      throw new Error(ERRORS.NON_EXISTENT_PRODUCT);
    }
  },

  // 각 줄이 올바른 형식인지 검사
  validatorLineFormat(line, expectedFields) {
    const columns = line.split(',');
    if (columns.length < expectedFields) {
      throw new Error(ERRORS.EXCEED_STOCK_FORMAT);
    }
  }
};

export default Validator;