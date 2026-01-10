class StoreService {
  // ... 이전의 isPromotionActive, findPromotion 메서드 포함

  /**
   * 프로모션 적용 결과를 계산합니다.
   * @param {Object} product - 상품 객체 (프로모션 재고)
   * @param {Object} promotion - 프로모션 상세 정보 (buy, get 등)
   * @param {number} requestedQuantity - 사용자가 요청한 수량
   */
  calculatePromotion(product, promotion, requestedQuantity) {
    const { buy, get } = promotion;
    const setSize = buy + get; // 예: 2+1이면 3개 세트

    // 1. 프로모션 재고 내에서 최대한 적용 가능한 세트 수
    const maxAvailableSets = Math.floor(product.quantity / setSize);
    const maxPromotionQuantity = maxAvailableSets * setSize;

    // 2. 사용자가 가져온 수량에서 혜택 적용 가능한 수량
    const userSets = Math.floor(requestedQuantity / setSize);
    const userApplicable = userSets * setSize;

    let bonus = 0;
    let fullPriceQuantity = 0;

    // 상황 A: 딱 맞게 가져왔거나 더 가져오면 혜택을 더 받을 수 있는 경우
    if (requestedQuantity % setSize === buy && requestedQuantity + get <= product.quantity) {
      bonus = get;
    }

    // 상황 B: 프로모션 재고가 부족하여 정가로 결제해야 하는 수량 계산
    if (requestedQuantity > maxPromotionQuantity) {
      fullPriceQuantity = requestedQuantity - maxPromotionQuantity;
    }

    return {
      applicable: userApplicable,
      bonus: bonus,
      fullPriceQuantity: fullPriceQuantity
    };
  }
}