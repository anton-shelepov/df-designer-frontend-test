interface IProps {
    callback: () => void;
    element: HTMLElement;
    options: MutationObserverInit;
}

const useMutationObserver = ({ callback, element, options }: IProps) => {
    if (element) {
        console.log(element);
        const observer = new MutationObserver(callback);
        observer.observe(element, options);
    }
};

export default useMutationObserver;
