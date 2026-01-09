// 1. 시스템 설정 관련 상수
export const SETTINGS = {
  CURRENCY_UNIT: "원",
  QUANTITY_UNIT: "개",
  MEMBERSHIP_DISCOUNT_RATE: 0.3,
  MAX_MEMBERSHIP_DISCOUNT: 8000,
  PROMOTION_STOCK_PRIORITY: true, // 프로모션 재고 우선 차감 여부
};

// 2. 출력 메시지 (OutputView용)
export const MESSAGES = {
  WELCOME: "\n안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n",
  PURCHASE_CONFIRM: "구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])",
  PROMOTION_ADD_ON: (name) => `현재 ${name}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`,
  PROMOTION_NO_DISCOUNT: (name, quantity) => `현재 ${name} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
  MEMBERSHIP_PROMPT: "멤버십 할인을 받으시겠습니까? (Y/N)",
  RETRY_PROMPT: "감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)",
  RECEIPT_HEADER: "\n==============W 편의점================",
  RECEIPT_PROMO_HEADER: "=============증	정=============== ",
  RECEIPT_FOOTER: "====================================\n",
};

// 3. 에러 메시지 (Validator 및 각 클래스 예외 처리용)
export const ERRORS = {
  PREFIX: "[ERROR]",
  INVALID_FORMAT: "[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.",
  NON_EXISTENT_PRODUCT: "[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.",
  EXCEED_STOCK: "[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.",
  INVALID_INPUT: "[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.",
};

// 4. 영수증 컬럼명 등 고정 텍스트
export const RECEIPT = {
  ITEM: "상품명",
  QUANTITY: "수량",
  AMOUNT: "금액",
  TOTAL_PURCHASE: "총구매액",
  PROMOTION_DISCOUNT: "행사할인",
  MEMBERSHIP_DISCOUNT: "멤버십할인",
  FINAL_AMOUNT: "내실돈",
};