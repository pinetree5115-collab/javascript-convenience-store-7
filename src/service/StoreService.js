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
}


export default StoreService;