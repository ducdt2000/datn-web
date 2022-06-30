import { SettingsInput } from '@ts-types/generated';
import Base from './base';

class Settings extends Base<SettingsInput, SettingsInput> {
  get;
}

export default new Settings();
