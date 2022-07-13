import { CreateBrand, UpdateBrand } from '@ts-types/generated';
import Base from './base';

class BrandRepository extends Base<CreateBrand, UpdateBrand> {}

export default new BrandRepository();
