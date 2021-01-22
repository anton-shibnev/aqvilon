export default function (dateString: string, full?: boolean): string {
  console.log(dateString);
  const date = new Date(dateString);

  if (!date.getDate) return '';

  const month = date.getMonth();
  const year = date.getFullYear();
  let quarter = 'I';
  if (month > 8) {
    quarter = 'IV';
  } else if (month > 5) {
    quarter = 'III';
  } else if (month > 2) {
    quarter = 'II';
  }

  return full ? `${quarter} КВАРТАЛ ${year} ГОДА` : `${quarter} кв ${year} г.`;
}
