class ProductConverter {
  static parse(fileContent) {
    const lines = fileContent.split('\n').slice(1); // 헤더 제외
    return lines.map(line => {
      const [name, price, quantity, promotion] = line.split(',');
      return {
        name: name.trim(),
        price: Number(price),
        quantity: Number(quantity),
        promotion: promotion.trim() === 'null' ? null : promotion.trim()
      };
    });
  }
}

export default ProductConverter;