import { useEffect } from 'react';
export default function useUnloadWarning(disable) {
    useEffect(() => {
        // Warn users that they will lose their progress if they leave the page.
        // Should use this in components where such as warning is acceptable.
        const handleBeforeUnload = (e) => {
            e.returnValue = 'If you leave now, any changes made in the current unit will not be saved.'; // most browsers actually show default message
        };
        if (disable !== null && disable !== void 0 ? disable : false)
            return;
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [disable]);
}
