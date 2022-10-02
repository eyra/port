var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { TableFactory } from './components/table';
import { SpinnerFactory } from './components/spinner';
import { FileInputFactory } from './components/file_input';
import { RadioInputFactory } from './components/radio_input';
import { EndOfFlowFactory } from './components/end_of_flow';
import { Title0Factory, Title1Factory, Title2Factory } from './components/text';
var ReactFactory = /** @class */ (function () {
    function ReactFactory() {
        this.mapping = {};
        this.mapping.Table = TableFactory;
        this.mapping.Spinner = SpinnerFactory;
        this.mapping.FileInput = FileInputFactory;
        this.mapping.RadioInput = RadioInputFactory;
        this.mapping.EndOfFlow = EndOfFlowFactory;
        this.mapping.Title0 = Title0Factory;
        this.mapping.Title1 = Title1Factory;
        this.mapping.Title2 = Title2Factory;
    }
    ReactFactory.prototype.add = function (factory, name) {
        this.mapping[name] = factory;
    };
    ReactFactory.prototype.createComponent = function (data, locale, resolve) {
        var type = data.__type__.split('.').pop();
        var props = __assign(__assign({}, data), { locale: locale, resolve: resolve });
        if (this.mapping[type] !== null) {
            var factoryMethod = this.mapping[type];
            return factoryMethod(props);
        }
        else {
            throw new Error("[VisualisationFactory] Received unsupported prompt: ".concat(type));
        }
    };
    return ReactFactory;
}());
export default ReactFactory;
