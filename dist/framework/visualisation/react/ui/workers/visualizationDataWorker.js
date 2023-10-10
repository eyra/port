var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prepareChartData } from './visualizationDataFunctions/prepareChartData';
import { prepareTextData } from './visualizationDataFunctions/prepareTextData';
self.onmessage = (e) => {
    createVisualizationData(e.data.table, e.data.visualization)
        .then((visualizationData) => {
        self.postMessage({ status: 'success', visualizationData });
    })
        .catch((error) => {
        console.error(error);
        self.postMessage({ status: 'error', visualizationData: undefined });
    });
};
function createVisualizationData(table, visualization) {
    return __awaiter(this, void 0, void 0, function* () {
        if (table === undefined || visualization === undefined)
            throw new Error('Table and visualization are required');
        if (['line', 'bar', 'area'].includes(visualization.type)) {
            return yield prepareChartData(table, visualization);
        }
        if (['wordcloud'].includes(visualization.type)) {
            return yield prepareTextData(table, visualization);
        }
        throw new Error(`Visualization type ${visualization.type} not supported`);
    });
}
