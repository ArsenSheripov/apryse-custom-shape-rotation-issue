import { WEB_SAFE_FONT_NAMES } from '../constants/fonts';

export const getTextWidth = (text: string, fontSize: number, font: string) => {
  const fontSizeMultiplier = {
    [WEB_SAFE_FONT_NAMES.TimesNewRoman]: 0.36,
    [WEB_SAFE_FONT_NAMES.Arial]: 0.42,
    [WEB_SAFE_FONT_NAMES.Tahoma]: 0.42,
    [WEB_SAFE_FONT_NAMES.Courier]: 0.5,
    [WEB_SAFE_FONT_NAMES.Verdana]: 0.43,
    [WEB_SAFE_FONT_NAMES.Georgia]: 0.38,
    [WEB_SAFE_FONT_NAMES.Impact]: 0.35,
  };

  const averageCharWidth = fontSize * (fontSizeMultiplier[font] ?? 0.45);
  return text.length * averageCharWidth;
};
