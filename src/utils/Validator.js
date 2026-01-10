import { ERRORS } from "../constants/constants.js";

const Validator = {
  validatorFileData(data) {
    //파일 전체 내용이 비어있는지 검사
    validatorFileData(data) {
      if (!data || data.trim() === "") {
        throw new Error(`${ERRORS.PREFIX} 파일이 비어있습니다.`);
      }
    }

    //각 줄이 올바른 형식인지 검사
    validatorLineFormat(line, expectedFields) {
      const columns = line.split(',');
      if (columns.length < expectedFields) {
        throw new Error(ERRORS.INVALID_FORMAT);
      }
    }
  };
  export default Validator;