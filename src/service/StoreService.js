class StoreService {
  #products = [];

  constructor(products) {
    this.#products = products;
  }

  // 재고 확인, 프로모션 계산, 최종 결제 금액 산출 로직이 여기 들어갑니다.
  calculatePayment(orderItems) {
    // 1. 재고 차감 가능 여부 확인
    // 2. 프로모션 적용 계산
    // 3. 멤버십 할인 적용
    // 4. 최종 결과 반환
  }
}

export default StoreService;