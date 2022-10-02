import { TableFactory } from './components/table';
import { SpinnerFactory } from './components/spinner';
import { FileInputFactory } from './components/file_input';
import { RadioInputFactory } from './components/radio_input';
import { EndOfFlowFactory } from './components/end_of_flow';
import { Title0Factory, Title1Factory, Title2Factory } from './components/text';
export default class ReactFactory {
    mapping = {};
    constructor() {
        this.mapping.Table = TableFactory;
        this.mapping.Spinner = SpinnerFactory;
        this.mapping.FileInput = FileInputFactory;
        this.mapping.RadioInput = RadioInputFactory;
        this.mapping.EndOfFlow = EndOfFlowFactory;
        this.mapping.Title0 = Title0Factory;
        this.mapping.Title1 = Title1Factory;
        this.mapping.Title2 = Title2Factory;
    }
    add(factory, name) {
        this.mapping[name] = factory;
    }
    createComponent(data, locale, resolve) {
        const type = data.__type__.split('.').pop();
        const props = { ...data, locale, resolve };
        if (this.mapping[type] !== null) {
            const factoryMethod = this.mapping[type];
            return factoryMethod(props);
        }
        else {
            throw new Error(`[VisualisationFactory] Received unsupported prompt: ${type}`);
        }
    }
}
