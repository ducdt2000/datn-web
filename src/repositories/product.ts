import { CreateProduct, UpdateProduct } from '@ts-types/generated';
import Base from './base';

class ProductRepository extends Base<CreateProduct, UpdateProduct> {}

export default new ProductRepository();
