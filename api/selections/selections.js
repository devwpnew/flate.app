import {
  selectionRepository,
  productRepository,
} from "./repository/repository";

export const selections = {
  selection: selectionRepository,
  product: productRepository,
};
