import LocaleService from './locale-service';
import ConfigService from './config-service';
import ToolService from './tool-service';
import EditorService from './editor-service';

const localeService = new LocaleService();
const configService = new ConfigService(localeService);
const toolService = new ToolService();
const editorService = new EditorService();

export default {
    configService,
    localeService,
    toolService,
    editorService,
};
