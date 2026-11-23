// Page copy and FAQs for directory pages. Plain, verifiable statements only.
import { CITIES } from './index';

const cityList = CITIES.map((c) => c.name);
export const AREA_TEXT = `${cityList.slice(0, -1).join(', ')} and ${cityList[cityList.length - 1]}`;

export function categoryIntro(category, city) {
  const where = city ? `${city.name}, Arizona` : AREA_TEXT;
  const covers = category.includes.length
    ? ` This page also covers ${joinList(category.includes.map((s) => s.toLowerCase()))}.`
    : '';
  return `Our guide to ${category.title.toLowerCase()} serving ${where}. Every listing is a real local business that has passed our verification check.${covers}`;
}

export function categoryFaq(category, city) {
  const where = city ? city.name : 'the Scottsdale area';
  const items = [
    {
      q: `How do businesses get listed among ${category.title.toLowerCase()} in ${where}?`,
      a: `Any ${category.name.toLowerCase()} business located in ${AREA_TEXT} can add a free listing. We confirm each one is a real, local business before it appears.`,
    },
    {
      q: 'How do you confirm a business is real?',
      a: 'We match each business to its Google Maps profile, confirm an email address on its own website domain and check that its website is live.' +
        (category.license ? ' Businesses in this category also provide an Arizona license number, which we check with the licensing authority.' : ''),
    },
    {
      q: 'What does the Partner label mean?',
      a: 'Partner marks a business that pays for an upgraded listing. Partners appear first and show their website, phone and email. Each category in each city has one Premier Partner at most. The label appears wherever a Partner is named, including in our articles.',
    },
    {
      q: 'Which areas does this guide cover?',
      a: `${AREA_TEXT}, Arizona.`,
    },
  ];
  if (category.includes.length) {
    items.splice(1, 0, {
      q: `Does this page include ${joinList(category.includes.map((s) => s.toLowerCase()), 'or')}?`,
      a: `Yes. ${category.title} here includes ${joinList(category.includes.map((s) => s.toLowerCase()))}.`,
    });
  }
  return items;
}

export function joinList(items, word = 'and') {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} ${word} ${items[items.length - 1]}`;
}
