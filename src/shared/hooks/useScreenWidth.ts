import { useCallback, useEffect, useState } from 'react';
import { ScreenType } from '../interface/screen-type';

export default function useScreenWidth() {
  const [ screenType, setScreenType ] = useState<string>('');

  const changeIsMobile = useCallback(() => {
    if (window.innerWidth <= 480) {
      setScreenType(ScreenType.MOBILE);
    } else if (window.innerWidth > 480 && window.innerWidth <= 768) {
      setScreenType(ScreenType.TABLETS);
    } else if (window.innerWidth > 768 && window.innerWidth <= 1200) {
      setScreenType(ScreenType.LAPTOP);
    } else if (window.innerWidth > 1200) {
      setScreenType(ScreenType.DESCTOP);
    }
  }, []);

  useEffect(() => {
    changeIsMobile();
    window.addEventListener('resize', changeIsMobile);
    return function cleanUp() {
      window.removeEventListener('resize', changeIsMobile);
    };
  }, [ changeIsMobile ]);

  return screenType;
}