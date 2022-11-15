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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Translator } from '../../../../translator';
import { BodyMedium, Title3 } from './text';
import TwitterSvg from '../../../../../assets/images/twitter.svg';
import FacebookSvg from '../../../../../assets/images/facebook.svg';
import InstagramSvg from '../../../../../assets/images/instagram.svg';
import YoutubeSvg from '../../../../../assets/images/youtube.svg';
import TextBundle from '../../../../text_bundle';
export var Instructions = function (props) {
    var _a = prepareCopy(props), title = _a.title, text = _a.text;
    var platform = props.platform.toLowerCase();
    return (_jsxs("div", __assign({ className: 'flex flex-col gap-6 p-8 border-2 border-grey4 rounded' }, { children: [_jsxs("div", __assign({ className: 'flex flex-row gap-8 items-center' }, { children: [_jsx("div", __assign({ className: 'flex-grow' }, { children: _jsx(Title3, { text: title, margin: '' }) })), _jsx("div", __assign({ className: 'h-12' }, { children: _jsx("img", { className: 'h-12', src: icon[platform] }) }))] })), _jsx(BodyMedium, { text: text, color: 'text-grey2', margin: '' })] })));
};
function prepareCopy(_a) {
    var platform = _a.platform, locale = _a.locale;
    var textBundle = text[platform.toLowerCase()];
    return {
        title: Translator.translate(title, locale),
        text: Translator.translate(textBundle, locale)
    };
}
var title = new TextBundle()
    .add('en', 'Instructions')
    .add('nl', 'Instructies');
var twitterText = new TextBundle()
    .add('en', 'If you have received an email with a link to your data from Twitter. Then click on the link and save the file. If you then select this file, profiling information will be extracted from it, which you can then view and donate.')
    .add('nl', 'Als je een email met een link naar jouw gegevens hebt ontvangen van Twitter. Klik dan op de link en sla het bestand op. Als u dit bestand vervolgens selecteert dan wordt daar profiling informatie uit gehaald, die u vervolgens kunt bekijken en doneren.');
var facebookText = new TextBundle()
    .add('en', 'If you have received an email with a link to your data from Facebook. Then click on the link and save the file. If you then select this file, profiling information will be extracted from it, which you can then view and donate.')
    .add('nl', 'Als je een email met een link naar jouw gegevens hebt ontvangen van Facebook. Klik dan op de link en sla het bestand op. Als u dit bestand vervolgens selecteert dan wordt daar profiling informatie uit gehaald, die u vervolgens kunt bekijken en doneren.');
var instagramText = new TextBundle()
    .add('en', 'If you have received an email with a link to your data from Instagram. Then click on the link and save the file. If you then select this file, profiling information will be extracted from it, which you can then view and donate.')
    .add('nl', 'Als je een email met een link naar jouw gegevens hebt ontvangen van Instagram. Klik dan op de link en sla het bestand op. Als u dit bestand vervolgens selecteert dan wordt daar profiling informatie uit gehaald, die u vervolgens kunt bekijken en doneren.');
var youtubeText = new TextBundle()
    .add('en', 'If you have received an email with a link to your data from Google. Then click on the link and save the file. If you then select this file, profiling information will be extracted from it, which you can then view and donate.')
    .add('nl', 'Als je een email met een link naar jouw gegevens hebt ontvangen van Google. Klik dan op de link en sla het bestand op. Als u dit bestand vervolgens selecteert dan wordt daar profiling informatie uit gehaald, die u vervolgens kunt bekijken en doneren.');
var text = {
    twitter: twitterText,
    facebook: facebookText,
    instagram: instagramText,
    youtube: youtubeText
};
var icon = {
    twitter: TwitterSvg,
    facebook: FacebookSvg,
    instagram: InstagramSvg,
    youtube: YoutubeSvg
};
