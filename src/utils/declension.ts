/** Склонение числительных в javascript https://gist.github.com/realmyst/1262561
 * использовать как declOfNum(count, ['найдена', 'найдено', 'найдены']);
 * return `Назначено на ${this.bound} ${declOfNum(this.bound, ['квартиру', 'квартиры', 'квартир'])}`
 * @param {Number} number - Числительно, относительно которого идёт склонение
 * @param {Array} titles - массив существительных для склонения. Первый элемент -
 * @returns {String}
 */
const declOfNum = (number:number, titles:Array<string>) => {
  const cases = [2, 0, 1, 1, 1, 2];

  return titles[(number % 100 > 4 && number % 100 < 20) ? 2
    : cases[(number % 10 < 5) ? number % 10 : 5]];
};

export default declOfNum;
