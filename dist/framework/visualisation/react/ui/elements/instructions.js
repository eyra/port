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
import { jsxs as _jsxs, Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Translator } from '../../../../translator';
import { Title3 } from './text';
import TwitterSvg from '../../../../../assets/images/twitter.svg';
import FacebookSvg from '../../../../../assets/images/facebook.svg';
import InstagramSvg from '../../../../../assets/images/instagram.svg';
import YoutubeSvg from '../../../../../assets/images/youtube.svg';
import TextBundle from '../../../../text_bundle';
import { Bullet } from './bullet';
var linkTwitter = 'https://eyra.co';
var linkFacebook = 'https://eyra.co';
var linkInstagram = 'https://eyra.co';
var linkYoutube = 'https://eyra.co';
export var Instructions = function (props) {
    var title = prepareCopy(props).title;
    var locale = props.locale;
    var platform = props.platform.toLowerCase();
    function renderBullets(bullets) {
        return bullets.map(function (bullet) { return renderBullet(bullet); });
    }
    function renderContent() {
        return (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: 'flex flex-col gap-4 text-bodymedium font-body text-grey2' }, { children: [renderBullets(bullets[platform][locale]), links[platform][locale]] })) }));
    }
    return (_jsxs("div", __assign({ className: 'flex flex-col gap-6 p-8 border-2 border-grey4 rounded' }, { children: [_jsxs("div", __assign({ className: 'flex flex-row gap-8 items-center' }, { children: [_jsx("div", __assign({ className: 'flex-grow' }, { children: _jsx(Title3, { text: title, margin: '' }) })), _jsx("div", __assign({ className: 'h-12' }, { children: _jsx("img", { className: 'h-12', src: icon[platform] }) }))] })), renderContent()] })));
};
function prepareCopy(_a) {
    var platform = _a.platform, locale = _a.locale;
    return {
        title: Translator.translate(title, locale)
    };
}
var title = new TextBundle()
    .add('en', 'Download')
    .add('nl', 'Download');
function renderBullet(text) {
    return (_jsx(Bullet, __assign({ frameSize: 'w-5 h-30px' }, { children: _jsx("div", { children: text }) })));
}
var bulletsTwitterEn = [
    'Check the email that you received from Twitter',
    'Click on the download link and store the file',
    'Choose the stored file and continue'
];
var bulletsTwitterNl = [
    'Ga naar de email die u ontvangen heeft van Twitter.',
    'Klik op de link "gedownload” en sla het bestand op',
    'Kies het bestand en ga verder.'
];
var bulletsFacebookEn = [
    'Check the email that you received from Facebook',
    'Click on the download link and store the file',
    'Choose the stored file and continue'
];
var bulletsFacebookNl = [
    'Ga naar de email die u ontvangen heeft van Facebook.',
    'Klik op de link “Je gegevens downloaden” en sla het bestand op.',
    'Kies het bestand en ga verder.'
];
var bulletsInstagramEn = [
    'Check the email that you received from Instagram',
    'Click on the download link and store the file',
    'Choose the stored file and continue'
];
var bulletsInstagramNl = [
    'Ga naar de email die u ontvangen heeft van Instagram.',
    'Klik op de link “Gegevens downloaden” en sla het bestand op.',
    'Kies het bestand en ga verder.'
];
var bulletsYoutubeEn = [
    'Check the email that you received from Google Takeout',
    'Click on the download link and store the file',
    'Choose the stored file and continue'
];
var bulletsYoutubeNl = [
    'Ga naar de email die u ontvangen heeft van Google Takeout.',
    'Klik op de link “Je bestanden downloaden” en sla het bestand op.',
    'Kies het bestand en ga verder.'
];
var bullets = {
    twitter: {
        en: bulletsTwitterEn,
        nl: bulletsTwitterNl
    },
    facebook: {
        en: bulletsFacebookEn,
        nl: bulletsFacebookNl
    },
    instagram: {
        en: bulletsInstagramEn,
        nl: bulletsInstagramNl
    },
    youtube: {
        en: bulletsYoutubeEn,
        nl: bulletsYoutubeNl
    }
};
function linkEn(link) {
    return _jsxs("div", { children: ["Click ", _jsx("span", __assign({ className: 'text-primary underline' }, { children: _jsx("a", __assign({ href: link, target: '_blank', rel: 'noreferrer' }, { children: "here" })) })), " for more extensive instructions"] });
}
function linkNl(link) {
    return _jsxs("div", { children: ["Klik ", _jsx("span", __assign({ className: 'text-primary underline' }, { children: _jsx("a", __assign({ href: link, target: '_blank', rel: 'noreferrer' }, { children: "hier" })) })), " voor uitgebreidere instructies"] });
}
var links = {
    twitter: {
        en: linkEn(linkTwitter),
        nl: linkNl(linkTwitter)
    },
    facebook: {
        en: linkEn(linkFacebook),
        nl: linkNl(linkFacebook)
    },
    instagram: {
        en: linkEn(linkInstagram),
        nl: linkNl(linkInstagram)
    },
    youtube: {
        en: linkEn(linkYoutube),
        nl: linkNl(linkYoutube)
    }
};
var icon = {
    twitter: TwitterSvg,
    facebook: FacebookSvg,
    instagram: InstagramSvg,
    youtube: YoutubeSvg
};
