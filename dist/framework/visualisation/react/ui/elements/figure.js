import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { memo, useMemo } from 'react';
import useVisualizationData from '../hooks/useVisualizationData';
import { Title6 } from './text';
import Lottie from 'lottie-react';
import spinnerDark from '../../../../../assets/lottie/spinner-dark.json';
import RechartsGraph from './figures/recharts_graph';
import VisxWordcloud from './figures/visx_wordcloud';
export const Figure = ({ table, visualization, locale, handleDelete, handleUndo }) => {
    var _a;
    const [visualizationData, status] = useVisualizationData(table, visualization);
    const { title } = useMemo(() => {
        const title = Translator.translate(visualization.title, locale);
        return { title };
    }, [visualization]);
    const { errorMsg, noDataMsg } = useMemo(() => prepareCopy(locale), [locale]);
    if ((visualizationData == null) && status === 'loading') {
        return (_jsx("div", Object.assign({ className: 'w-12 h-12' }, { children: _jsx(Lottie, { animationData: spinnerDark, loop: true }) })));
    }
    if (status === 'error') {
        return _jsx("div", Object.assign({ className: 'flex justify-center items-center text-error' }, { children: errorMsg }));
    }
    const visualizationHeightTruthy = Boolean(visualization.height);
    const minHeight = visualizationHeightTruthy ? `${(_a = visualization.height) !== null && _a !== void 0 ? _a : ''} px` : '20rem';
    return (_jsxs("div", Object.assign({ className: 'flex flex-col overflow-hidden' }, { children: [_jsx(Title6, { text: title, margin: 'mt-2 mb-4' }), _jsx("div", Object.assign({ className: 'relative z-50 flex max-w-full', style: { flex: `1 1 ${minHeight}`, minHeight } }, { children: _jsx(RenderVisualization, { visualizationData: visualizationData, fallbackMessage: noDataMsg }) }))] })));
};
const RenderVisualization = memo(({ visualizationData, fallbackMessage }) => {
    if (visualizationData == null)
        return null;
    const fallback = (_jsx("div", Object.assign({ className: 'm-auto font-bodybold text-4xl text-grey2 ' }, { children: fallbackMessage })));
    if (['line', 'bar', 'area'].includes(visualizationData.type)) {
        const chartVisualizationData = visualizationData;
        if (chartVisualizationData.data.length === 0)
            return fallback;
        return _jsx(RechartsGraph, { visualizationData: chartVisualizationData });
    }
    if (visualizationData.type === 'wordcloud') {
        const textVisualizationData = visualizationData;
        if (textVisualizationData.topTerms.length === 0)
            return fallback;
        return _jsx(VisxWordcloud, { visualizationData: textVisualizationData });
    }
    return null;
});
function prepareCopy(locale) {
    return {
        errorMsg: Translator.translate(errorMsg, locale),
        noDataMsg: Translator.translate(noDataMsg, locale)
    };
}
const noDataMsg = new TextBundle().add('en', 'No data').add('nl', 'Geen data');
const errorMsg = new TextBundle()
    .add('en', 'Could not create visualization')
    .add('nl', 'Kon visualisatie niet maken');
