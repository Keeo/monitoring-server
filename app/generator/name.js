export default function() {
  return {
    getName() {
      return 'not-yet-' + Math.random().toString();
    }
  };
}
