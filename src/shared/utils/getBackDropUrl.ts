import { SIZE } from '../interface/size';

const getBackDropUrl = (url: string, size: string = SIZE.ORIGINAL) => {
  return `https://image.tmdb.org/t/p/${size}/${url}`;
};

export default getBackDropUrl;