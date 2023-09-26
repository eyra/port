import { jsx as _jsx } from "react/jsx-runtime";
import useResponsiveScreen from './ui/hooks/useResponsiveScreenSize';
export const Main = ({ elements }) => {
    useResponsiveScreen();
    elements = elements.map((element, index) => {
        return Object.assign(Object.assign({}, element), { key: `${index}` });
    });
    return _jsx("div", Object.assign({ className: 'w-full h-full' }, { children: elements }));
};
