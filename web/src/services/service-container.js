import LocaleService from './locale-service';
import ConfigService from './config-service';
import ToolService from './tool-service';

const localeService = new LocaleService();
const configService = new ConfigService(localeService);
const toolService = new ToolService();

export default {
    configService,
    localeService,
    toolService,
};
