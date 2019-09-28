import { generate_year_range } from '../utils/yearRange';

export function yearDataRange() {
  const currentYear = new Date().getFullYear();
  const data = generate_year_range(1970, currentYear);

  return data.map((item: number) => ({ value: item, label: item })).reverse();
}
