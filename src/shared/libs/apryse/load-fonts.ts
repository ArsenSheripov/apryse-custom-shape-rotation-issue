const fontTypes = {
  ttf: 'truetype',
  woff: 'woff',
  woff2: 'woff2',
} as const;

export const loadFont = (font: string, fontType: keyof typeof fontTypes) => {
  const fontDirectoryPath = '/fonts/';

  const fontName = font.replace(/\s/g, '');
  const fileName = fontName;

  const fontStyle = { style: 'normal', weight: 'normal' };

  let url = '';

  const fontPath = `${fontDirectoryPath}${'webfonts/'}${fileName}.${fontType}`;
  url = `url(${fontPath}) format(${fontTypes[fontType]})`;

  const fontFace = new FontFace(font, url, fontStyle);

  fontFace.load().then(loadedFace => {
    document.fonts.add(loadedFace);
  });
};
