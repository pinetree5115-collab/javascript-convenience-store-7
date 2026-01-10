//데이터 및 로직을 맡은 부분(실제 계산기역할)
import { Random } from "@woowacourse/mission-utils";
import fs from 'fs';
import path from 'path';
import { ERRORS } from '../constants/constants.js';

class PromotionConverter {
  static getPromotions() {
    try {
      // 1. 파일 경로를 찾고 데이터를 읽어옵니다.
      const filePath = path.resolve('public/promotions.md');
      const data = fs.readFileSync(filePath, 'utf-8');

      // 2. 데이터가 비어있는지 확인합니다.
      if (!data.trim()) return [];

      //3. 각 줄을 나누고 빈 줄은 제거합니다.
      const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');

      //4. 첫 번째 줄을 제외합니다.
      const content = lines.slice(1);

      //5.각 줄을 쉼표(,)로 나누어 객체 배열로 만듭니다.
      return content.map(line => {
        const [name, buy, get, startdate, enddate] = line.split(',');

        return {
          name: name.trim(),
          buy: Number(buy), // '2' -> 2 (숫자로 변환)
          get: Number(get), // '1' -> 1 (숫자로 변환)
          startdate: new Date(startdate.trim()), // '2024-01-01' -> Date 객체
          enddate: new Date(enddate.trim()), // '2024-12-31' -> Date 객체
        };
      });

    } catch (error) {
      // 파일을 읽는 중 오류가 발생한 경우 에러를 던집니다.
      throw new Error(`${ERRORS.PREFIX} 파일을 읽는 중 오류가 발생했습니다.`);
    }
  } // getPromotions 메서드 끝
}// PromotionConverter 클래스 끝

export default PromotionConverter;