export default function orderParser(string = '') {
  const orders = [];
  string.split(',').forEach(token => {
    switch (token.charAt(0)) {
      case '-':
        orders.push([token.substring(1), 'DESC']);
        break;
      default:
        orders.push([token, 'ASC']);
        break;
    }
  });
  return orders;
}
