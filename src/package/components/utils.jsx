import React, {useCallback, useContext} from "react";
import {DatepickerContext} from "../index";
import {BG_COLOR, BORDER_COLOR, RING_COLOR} from "../constants";

export const DateIcon = ({className}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>

    );
};

export const CloseIcon = ({className = "w-6 h-6"}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
};

export const ChevronLeftIcon = ({className} = "w-6 h-6") => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
    );
};

export const DoubleChevronLeftIcon = ({className = "w-6 h-6"}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
        </svg>
    );
};

export const ChevronRightIcon = ({className = "w-6 h-6"}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>

    );
};

export const DoubleChevronRightIcon = ({className = "w-6 h-6"}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        </svg>
    );
};

export const Arrow = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="absolute z-20 h-4 w-4 rotate-45 mt-0.5 ml-[1.2rem] border-l border-t border-gray-300 bg-white dark:bg-slate-800"/>
    );
});

export const SecondaryButton = ({children, onClick}) => {
    // Contexts
    const {primaryColor} = useContext(DatepickerContext);

    // Functions
    const getClassName = useCallback(() => {
        return `w-full transition-all duration-300 bg-white dark:text-gray-700 font-medium border border-gray-300 px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-offset-2 hover:bg-gray-50 ${RING_COLOR.focus[primaryColor]}`;
    }, [primaryColor]);

    return (
        <button type="button" className={getClassName()} onClick={onClick}>
            {children}
        </button>
    );
};

export const PrimaryButton = ({children, onClick, disabled = false}) => {
    // Contexts
    const {primaryColor} = useContext(DatepickerContext);

    // Functions
    const getClassName = useCallback(() => {
        return `w-full transition-all duration-300 ${BG_COLOR["500"][primaryColor]} ${BORDER_COLOR["500"][primaryColor]} text-white font-medium border px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-offset-2 ${BG_COLOR.hover[primaryColor]} ${RING_COLOR.focus[primaryColor]} ${disabled ? ' cursor-no-drop' : ''}`;
    }, [disabled, primaryColor]);

    return (
        <button type="button" className={getClassName()} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export const RoundedButton = ({children, onClick, roundedFull = false, padding = "py-[0.55rem]"}) => {
    // Contexts
    const {primaryColor} = useContext(DatepickerContext);

    // Functions
    const getClassName = useCallback(() => {
        const defaultClass = !roundedFull ? `w-full tracking-wide dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10 transition-all duration-300 px-3 ${padding} uppercase hover:bg-gray-100 rounded-md focus:ring-1` : "dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10 transition-all duration-300 hover:bg-gray-100 rounded-full p-[0.45rem] focus:ring-1";
        switch (primaryColor) {
            case "blue":
                return  `${defaultClass} focus:ring-blue-500/50 focus:bg-blue-100/50`;
            case "orange":
                return  `${defaultClass} focus:ring-orange-500/50 focus:bg-orange-100/50`;
            case "yellow":
                return  `${defaultClass} focus:ring-yellow-500/50 focus:bg-yellow-100/50`;
            case "red":
                return  `${defaultClass} focus:ring-red-500/50 focus:bg-red-100/50`;
            case "purple":
                return  `${defaultClass} focus:ring-purple-500/50 focus:bg-purple-100/50`;
            case "amber":
                return  `${defaultClass} focus:ring-amber-500/50 focus:bg-amber-100/50`;
            case "lime":
                return  `${defaultClass} focus:ring-lime-500/50 focus:bg-lime-100/50`;
            case "green":
                return  `${defaultClass} focus:ring-green-500/50 focus:bg-green-100/50`;
            case "emerald":
                return  `${defaultClass} focus:ring-emerald-500/50 focus:bg-emerald-100/50`;
            case "teal":
                return  `${defaultClass} focus:ring-teal-500/50 focus:bg-teal-100/50`;
            case "cyan":
                return  `${defaultClass} focus:ring-cyan-500/50 focus:bg-cyan-100/50`;
            case "sky":
                return  `${defaultClass} focus:ring-sky-500/50 focus:bg-sky-100/50`;
            case "indigo":
                return  `${defaultClass} focus:ring-indigo-500/50 focus:bg-indigo-100/50`;
            case "violet":
                return  `${defaultClass} focus:ring-violet-500/50 focus:bg-violet-100/50`;
            case "fuchsia":
                return  `${defaultClass} focus:ring-fuchsia-500/50 focus:bg-fuchsia-100/50`;
            case "pink":
                return  `${defaultClass} focus:ring-pink-500/50 focus:bg-pink-100/50`;
            case "rose":
                return  `${defaultClass} focus:ring-rose-500/50 focus:bg-rose-100/50`;
            default:
                return "";
        }
    }, [padding, primaryColor, roundedFull]);

    return (
        <button className={getClassName()} onClick={onClick}>
            {children}
        </button>
    );
};

export const VerticalDash = () => {
    // Contexts
    const {primaryColor} = useContext(DatepickerContext);

    return (
        <div className={`bg-blue-500 h-7 w-1 rounded-full hidden md:block ${BG_COLOR["500"][primaryColor]}`}/>
    );
};