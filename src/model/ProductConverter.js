import fs from 'fs';
import path from 'path';
import { ERRORS } from '../constants/constants.js';

class ProductConverter {
  static getProducts() {
    try {
      //파일 경로 설정(절대 경로 권장)
      const filePath = path.resolve('./data/products.md');
      const data = fs.readFileSync(filePath, 'utf-8');
      //정상적인 데이터가 없다면 에러표시
      if (!data.trim()) throw new Error(ERRORS.INVALID_INPUT);

      //한 줄씩 나누고 헤더(name,price...) 제거
      const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');
      const content = lines.slice(1);
      return content.map(line => {
        const [name, price, quantity, promotion] = line.split(',');
        return {
          name: name.trim(),
          price: Number(price),
          quantity: Number(quantity),
          promotion: promotion.trim() === 'null' ? null : promotion.trim()
        };
      });
    } catch (error) {
      throw new Error(`${ERRORS.PREFIX} 파일을 읽는 중 오류가 발생했습니다.`);
    }
  }
}

export default ProductConverter;