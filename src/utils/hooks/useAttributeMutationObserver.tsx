import { useEffect } from "react";

interface IProps {
    callback: () => void;
    attrName: string;
    element: HTMLElement | null;
}

const useAttributeMutationObserver = ({ callback, attrName, element }: IProps) => {
    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === attrName) {
                callback();
            }
        });
    });
    useEffect(() => {
        if (element) {
            mutationObserver.observe(element, {
                attributes: true,
            });
        }
        return () => mutationObserver.disconnect();
    }, [element]);
};

export default useAttributeMutationObserver;
