export default function getProductSection(product) {
  if (!product || !product.section_relation || !product.section_relation[0]) {
    return "";
  }

  const section = product.section_relation[0];

  return section;
}
