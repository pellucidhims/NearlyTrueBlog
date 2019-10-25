export function transformDataforCard(originalData = undefined) {
  let transformData = [];
  if (originalData) {
    transformData = {
      id: originalData.ID,
      name: originalData.title,
      cardContentText: originalData.excerpt,
      cardImageUrl: originalData.post_thumbnail.URL
    };
  }
  return transformData;
}
