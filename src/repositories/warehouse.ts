import {
  CreateWarehouse,
  UpdateWarehouse,
  WarehouseItemInput,
} from '@ts-types/generated';
import Base from './base';
import http from '@utils/api/http';

class WarehouseRepository extends Base<CreateWarehouse, UpdateWarehouse> {
  archive = async (url: string, variables: { status: number }) => {
    return http.put(url, variables);
  };

  createItem = async (url: string, variables: WarehouseItemInput) => {
    return http.post(url, variables);
  };
}

export default new WarehouseRepository();
