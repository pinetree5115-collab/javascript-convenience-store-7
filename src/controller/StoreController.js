import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import StoreService from "../service/StoreService.js";

class StoreController {
  async run() {
    try {
      // 1. 파일 읽기 및 데이터 초기화 (Service 생성)
      // 2. 환영 인사 및 상품 목록 출력
      // 3. 상품 입력 받기
      // 4. Service를 통한 계산
      // 5. 결과 출력 (영수증)
      // 6. 추가 구매 여부 확인
    } catch (error) {
      OutputView.printError(error.message);
      await this.run(); // 에러 발생 시 재시작
    }
  }
}

export default StoreController;