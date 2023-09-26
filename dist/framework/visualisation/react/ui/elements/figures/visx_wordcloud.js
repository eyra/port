import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from '@visx/text';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { ParentSize } from '@visx/responsive';
import { useMemo } from 'react';
function VisxWordcloud({ visualizationData }) {
    const fontRange = [12, 60];
    const colors = ['#1E3FCC', '#4272EF', '#CC9F3F', '#FFCF60'];
    const nWords = 100;
    const words = useMemo(() => {
        return visualizationData.topTerms.slice(0, nWords);
    }, [visualizationData, nWords]);
    return (_jsx(ParentSize, { children: (parent) => (_jsx(Wordcloud, Object.assign({ words: words, height: parent.height, width: parent.width, rotate: 0, padding: 3, spiral: 'rectangular', fontSize: (w) => w.importance * (fontRange[1] - fontRange[0]) + fontRange[0], random: () => 0.5 }, { children: (cloudWords) => {
                return cloudWords.map((w, i) => {
                    var _a, _b, _c;
                    return (_jsx(Text, Object.assign({ fill: colors[Math.floor((i / cloudWords.length) * colors.length)], fontSize: w.size, textAnchor: 'middle', fontFamily: w.font, transform: `translate(${(_a = w.x) !== null && _a !== void 0 ? _a : 0}, ${(_b = w.y) !== null && _b !== void 0 ? _b : 0}) rotate(${(_c = w.rotate) !== null && _c !== void 0 ? _c : 0})` }, { children: w.text }), w.text));
                });
            } }))) }));
}
export default VisxWordcloud;
