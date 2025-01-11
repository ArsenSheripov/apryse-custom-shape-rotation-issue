import { SelectOptionType } from 'shared/types';

export const webFonts = [
  'Arimo',
  'Caladea',
  'Carlito',
  'Cousine',
  'Liberation Serif',
  'Open Sans',
  'Roboto',
  'Roboto Mono',
  'Tinos',
  'Ephesis',
  'AguDisplay',
  'Heebo',
  'HindSiliguri',
  'HomemadeApple',
  'Inter',
  'Italianno',
  'Lato',
  'Lora',
  'Merriweather',
  'Montserrat',
  'NotoSansKR',
  'NotoSansTC',
  'NotoSansJP',
  'Nunito',
  'Oswald',
  'Parisienne',
  'PlayfairDisplay',
  'PlaywriteUSTradGuides',
  'Poppins',
  'Raleway',
  'Rubik',
  'Tangerine',
  'Ubuntu',
];

export const WEB_SAFE_FONT_NAMES = {
  TimesNewRoman: 'Times New Roman',
  Arial: 'Arial',
  Tahoma: 'Tahoma',
  Courier: 'Courier',
  Verdana: 'Verdana',
  Georgia: 'Georgia',
  Impact: 'Impact',
};

export const webFontsOptions = webFonts.map(item => ({ value: item, label: item }));

export const webSafeFontsOptions: SelectOptionType[] = [
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Courier', label: 'Courier' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Impact', label: 'Impact' },
] as const;

export const defaultFonts = [...webSafeFontsOptions, ...webFontsOptions];

export type FontPresetName = 'title' | 'normal' | 'subtitle' | 'heading1' | 'heading2' | 'heading3' | 'heading4';

export type FontPresetProperties = {
  FontSize: SelectOptionType;
};

export const fontPreset: Record<FontPresetName, FontPresetProperties> = {
  normal: {
    FontSize: { value: '11pt', label: '11' },
  },
  title: {
    FontSize: { value: '26pt', label: '26' },
  },
  subtitle: {
    FontSize: { value: '15pt', label: '15' },
  },
  heading1: {
    FontSize: { value: '20pt', label: '20' },
  },
  heading2: {
    FontSize: { value: '16pt', label: '16' },
  },
  heading3: {
    FontSize: { value: '14pt', label: '14' },
  },
  heading4: {
    FontSize: { value: '12pt', label: '12' },
  },
} as const;

export const fontPresets: SelectOptionType<keyof typeof fontPreset>[] = [
  { value: 'normal', label: 'Normal text' },
  { value: 'title', label: 'Title' },
  { value: 'subtitle', label: 'Subtitle' },
  { value: 'heading1', label: 'Heading 1' },
  { value: 'heading2', label: 'Heading 2' },
  { value: 'heading3', label: 'Heading 3' },
  { value: 'heading4', label: 'Heading 4' },
];

export const MIN_FONT_SIZE = 1;
// Default maxFontSize
export const RENDER_ROWS_UPPER_LIMIT = 120;
// Default increment map
export const BREAKS_AND_INCREMENT = {
  0: 1,
  20: 2,
  48: 4,
};

type GenerateFontSizeOptionsParams = {
  currentSize: number;
  initialFontValue: number;
  initialMaxFontValue: number;
  incrementMap: Record<number, number>;
  maxFontSize: number;
  fontUnit: string;
};

export const generateFontSizeOptions = ({
  currentSize,
  initialFontValue,
  initialMaxFontValue,
  incrementMap,
  maxFontSize,
  fontUnit,
}: GenerateFontSizeOptionsParams): SelectOptionType[] => {
  const isValidNum = (num: number, arr: number[] = []) =>
    num && arr.indexOf(num) === -1 && num <= maxFontSize && num >= MIN_FONT_SIZE;

  const normalizedIncrementMap: Record<number, number> = {
    ...incrementMap,
    [maxFontSize]: 12,
  };

  const getIncrement = (num: number) => {
    let greaterThanLast = false;
    let last;

    const keys = Object.keys(normalizedIncrementMap)
      .map(i => parseFloat(i))
      .sort((a, b) => a - b);

    for (const i of keys) {
      if (num < i && greaterThanLast) {
        return last ? normalizedIncrementMap[last] : normalizedIncrementMap[0];
      }

      if (i === keys[keys.length - 1]) {
        return normalizedIncrementMap[i];
      }

      if (num >= i) {
        greaterThanLast = true;
        last = i;
      }
    }
  };

  const sizes = [initialFontValue];
  for (let i = 1; i <= RENDER_ROWS_UPPER_LIMIT; i++) {
    const increment = getIncrement(sizes[sizes.length - 1]) || normalizedIncrementMap[1];

    const nextSize = sizes[sizes.length - 1] + increment;

    if (nextSize > initialMaxFontValue) {
      break;
    }

    if (isValidNum(nextSize, sizes)) {
      sizes.push(nextSize);
    }
  }

  if (!sizes.includes(currentSize)) {
    sizes.push(currentSize);
    sizes.sort((a, b) => a - b);
  }

  return sizes.map(item => ({
    value: `${item}${fontUnit}`,
    label: item.toString(),
  }));
};

export const defaultFontSizes = generateFontSizeOptions({
  currentSize: 12,
  initialFontValue: MIN_FONT_SIZE,
  initialMaxFontValue: RENDER_ROWS_UPPER_LIMIT,
  incrementMap: BREAKS_AND_INCREMENT,
  maxFontSize: RENDER_ROWS_UPPER_LIMIT,
  fontUnit: 'pt',
});
