import { DateTimes } from "@woowacourse/mission-utils";

class StoreService {
  /**
   * 오늘 날짜가 프로모션 기간 내에 있는지 확인합니다.
   * @param {Object} promotion - PromotionConverter에서 만든 프로모션 객체
   * @returns {boolean}
   */
  isPromotionActive(promotion) {
    if (!promotion) return false;
    // mission-utils에서 현재 날짜를 가져옵니다. (테스트 환경에서도 이 함수가 시간을 제어함)
    const now = DateTimes.now();

    // 시작일 <= 오늘 <= 종료일 확인
    return now >= promotion.startdate && now <= promotion.enddate;
  }

  /**
   * 특정 상품에 적용되는 프로모션 정보를 찾아 반환합니다.
   * @param {string} promotionName - 상품에 적힌 프로모션 이름
   * @param {Array} promotions - 모든 프로모션 정보 배열
   */
  findPromotion(promotionName, promotions) {
    return promotions.find(p => p.name === promotionName) || null;
  }

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

  /**
   * 상품의 재고를 차감합니다. (프로모션 재고 우선)
   * @param {Array} products - 전체 상품 목록
   * @param {string} name - 차감할 상품명
   * @param {number} quantity - 차감할 총 수량
   */
  updateStock(products, name, quantity) {
    let remaining = quantity;

    // 1. 프로모션 재고가 있는 상품 먼저 찾아서 차감
    const promoProduct = products.find(p => p.name === name && p.promotion !== null);
    if (promoProduct && promoProduct.quantity > 0) {
      const decrease = Math.min(promoProduct.quantity, remaining);
      promoProduct.quantity -= decrease;
      remaining -= decrease;
    }

    // 2. 남은 수량이 있다면 일반 재고에서 차감
    if (remaining > 0) {
      const normalProduct = products.find(p => p.name === name && p.promotion === null);
      if (normalProduct) {
        normalProduct.quantity -= remaining;
      }
    }
  }
}

export default StoreService;