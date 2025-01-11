interface GetTextDecorationParams {
  isUnderline?: boolean;
  isStrikeout?: boolean;
}

export const getTextDecoration = ({ isStrikeout, isUnderline }: GetTextDecorationParams) => {
  let result = '';

  if (isUnderline) {
    result += 'underline ';
  }

  if (isStrikeout) {
    result += 'line-through';
  }

  if (!isUnderline && !isStrikeout) {
    result += 'none';
  }

  return result.trim();
};
