var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getTableColumn, rescaleToRange, tokenize } from './util';
export function prepareTextData(table, visualization) {
    return __awaiter(this, void 0, void 0, function* () {
        const visualizationData = {
            type: visualization.type,
            topTerms: []
        };
        if (table.body.rows.length === 0)
            return visualizationData;
        const texts = getTableColumn(table, visualization.textColumn);
        const values = visualization.valueColumn != null ? getTableColumn(table, visualization.valueColumn) : null;
        const vocabulary = getVocabulary(texts, values, visualization);
        visualizationData.topTerms = getTopTerms(vocabulary, texts.length, 200);
        return visualizationData;
    });
}
function getVocabulary(texts, values, visualization) {
    var _a;
    const vocabulary = {};
    for (let i = 0; i < texts.length; i++) {
        if ((texts === null || texts === void 0 ? void 0 : texts[i]) == null)
            continue;
        const text = texts[i];
        const tokens = visualization.tokenize != null && visualization.tokenize ? tokenize(text) : [text];
        const seen = new Set();
        for (const token of tokens) {
            if (vocabulary[token] === undefined)
                vocabulary[token] = { value: 0, docFreq: 0 };
            if (!seen.has(token)) {
                vocabulary[token].docFreq += 1;
                seen.add(token);
            }
            const v = (_a = Number(values === null || values === void 0 ? void 0 : values[i])) !== null && _a !== void 0 ? _a : 1;
            if (!isNaN(v))
                vocabulary[token].value += v;
        }
    }
    return vocabulary;
}
function getTopTerms(vocabulary, nDocs, topTerms) {
    const words = Object.entries(vocabulary)
        .map(([text, stats]) => {
        const tf = Math.log(1 + stats.value);
        const idf = Math.log(nDocs / stats.docFreq);
        return { text, value: stats.value, importance: tf * idf };
    })
        .sort((a, b) => b.importance - a.importance)
        .slice(0, topTerms);
    const minImportance = Math.min(...words.map((w) => w.importance));
    const maxImportance = Math.max(...words.map((w) => w.importance));
    return words.map((w) => {
        return {
            text: w.text,
            value: w.value,
            importance: rescaleToRange(w.importance, minImportance, maxImportance, 0, 1)
        };
    });
}
