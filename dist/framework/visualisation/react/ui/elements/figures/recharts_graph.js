import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, AreaChart, Area } from 'recharts';
export default function RechartsGraph({ visualizationData }) {
    function tooltip() {
        return (_jsx(Tooltip, { allowEscapeViewBox: { x: false, y: false }, labelStyle: { marginBottom: '0.5rem' }, contentStyle: {
                fontSize: '0.8rem',
                lineHeight: '0.8rem',
                background: '#fff8',
                backdropFilter: 'blur(3px)'
            } }));
    }
    function axes(minTickGap) {
        const hasVisualizationData = Boolean(visualizationData);
        if (!hasVisualizationData)
            return null;
        const secondary = Object.values(visualizationData.yKeys).findIndex((yKey) => yKey.secondAxis) !==
            -1;
        const { tickFormatter, tickFormatter2 } = getTickFormatters(Object.values(visualizationData.yKeys));
        return (_jsxs(_Fragment, { children: [_jsx(XAxis, { dataKey: visualizationData.xKey.label, minTickGap: minTickGap }), _jsx(YAxis, { yAxisId: 'left', tickFormatter: tickFormatter }), secondary && _jsx(YAxis, { yAxisId: 'right', orientation: 'right', tickFormatter: tickFormatter2 })] }));
    }
    function legend() {
        return (_jsx(Legend, { margin: { left: 10 }, align: 'right', verticalAlign: 'top', iconType: 'plainline', wrapperStyle: { fontSize: '0.8rem' } }));
    }
    let chart = null;
    if (visualizationData.type === 'line') {
        chart = (_jsxs(LineChart, Object.assign({ data: visualizationData.data }, { children: [axes(20), tooltip(), legend(), Object.values(visualizationData.yKeys).map((yKey, i) => {
                    var _a;
                    const { color, dash } = getLineStyle(i);
                    return (_jsx(Line, { yAxisId: ((_a = yKey.secondAxis) !== null && _a !== void 0 ? _a : false) ? 'right' : 'left', type: 'monotone', dataKey: yKey.label, dot: false, strokeWidth: 2, stroke: color, strokeDasharray: dash }, yKey.label));
                })] })));
    }
    if (visualizationData.type === 'bar') {
        chart = (_jsxs(BarChart, Object.assign({ data: visualizationData.data }, { children: [axes(0), tooltip(), legend(), Object.values(visualizationData.yKeys).map((yKey, i) => {
                    var _a;
                    const { color } = getLineStyle(i);
                    return (_jsx(Bar, { yAxisId: ((_a = yKey.secondAxis) !== null && _a !== void 0 ? _a : false) ? 'right' : 'left', dataKey: yKey.label, fill: color }, yKey.label));
                })] })));
    }
    if (visualizationData.type === 'area') {
        chart = (_jsxs(AreaChart, Object.assign({ data: visualizationData.data }, { children: [axes(20), tooltip(), legend(), Object.values(visualizationData.yKeys).map((yKey, i) => {
                    var _a;
                    const { color } = getLineStyle(i);
                    return (_jsx(Area, { yAxisId: ((_a = yKey.secondAxis) !== null && _a !== void 0 ? _a : false) ? 'right' : 'left', dataKey: yKey.label, fill: color }, yKey.label));
                })] })));
    }
    if (chart == null)
        return null;
    return (_jsx(ResponsiveContainer, Object.assign({ width: '100%', height: '100%' }, { children: chart })));
}
function getLineStyle(index) {
    const COLORS = ['#4272EF', '#FF5E5E', '#FFCF60', '#1E3FCC', '#CC3F3F', '#CC9F3F'];
    const DASHES = ['1', '5 5', '10 10', '5 5 10 10'];
    const cell = index % (COLORS.length * DASHES.length);
    const row = index % COLORS.length;
    const column = Math.floor(cell / COLORS.length);
    return { color: COLORS[row], dash: DASHES[column] };
}
function getTickFormatters(yKeys) {
    var _a;
    let tickerFormat;
    let tickerFormat2;
    for (const yKey of yKeys) {
        if (!((_a = yKey.secondAxis) !== null && _a !== void 0 ? _a : false)) {
            if (tickerFormat === undefined)
                tickerFormat = yKey.tickerFormat;
            if (tickerFormat !== yKey.tickerFormat)
                tickerFormat = 'default';
        }
        else {
            if (tickerFormat2 === undefined)
                tickerFormat2 = yKey.tickerFormat;
            if (tickerFormat2 !== yKey.tickerFormat)
                tickerFormat2 = 'default';
        }
    }
    const tickFormatter = getTickFormatter(tickerFormat !== null && tickerFormat !== void 0 ? tickerFormat : 'default');
    const tickFormatter2 = getTickFormatter(tickerFormat2 !== null && tickerFormat2 !== void 0 ? tickerFormat2 : 'default');
    return { tickFormatter, tickFormatter2 };
}
function getTickFormatter(format) {
    if (format === 'percent')
        return (value) => `${value}%`;
    return undefined;
}
