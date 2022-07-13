import { CreateProductType, UpdateProductType } from '@ts-types/generated';
import Base from './base';

class ProductType extends Base<CreateProductType, UpdateProductType> {}

export default new ProductType();
