import React, {useCallback, useContext} from "react";
import dayjs from "dayjs";
import {DatepickerContext} from "../index";
import {DEFAULT_SHORTCUTS, TEXT_COLOR} from "../constants";

const ItemTemplate = React.memo((props) => {
    const {primaryColor, period, changePeriod, changeInputText, updateFirstDate, dayHover, changeDayHover} = useContext(DatepickerContext);

    // Functions
    const getClassName = useCallback(() => {
        return `whitespace-nowrap w-1/2 md:w-1/3 lg:w-auto transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded cursor-pointer ${TEXT_COLOR["600"][primaryColor]} ${TEXT_COLOR.hover[primaryColor]}`;
    }, [primaryColor]);

    const chosePeriod = useCallback((item) => {
        if (dayHover) {
            changeDayHover(null);
        }
        if (period.start || period.end) {
            changePeriod({
                start: null,
                end: null
            });
        }
        changeInputText(`${item.start} ~ ${item.end}`);
        changePeriod(item);
        updateFirstDate(dayjs(item.start))
    }, [changeDayHover, changeInputText, changePeriod, dayHover, period.end, period.start, updateFirstDate]);

    return (
        <li
            className={getClassName()}
            onClick={() => {chosePeriod(props?.item.period)}}
        >
            {props?.children}
        </li>
    );
});

const Shortcuts = () => {
    // Contexts
    const {configs} = useContext(DatepickerContext);

    return (
        <div className="md:border-b mb-3 lg:mb-0 lg:border-r lg:border-b-0 border-gray-300 dark:border-gray-700 pr-1">
            <ul className="w-full tracking-wide flex flex-wrap lg:flex-col pb-1 lg:pb-0">
                {(Object.entries(DEFAULT_SHORTCUTS)).map(([key, item], index) => (
                    key === "past" ? (
                        item.map((item, index) => (
                            <ItemTemplate key={index} item={item}>
                                {configs && configs.shortcuts && (key in configs.shortcuts) ? (
                                    configs.shortcuts[key](item.daysNumber)
                                ) : item.text}
                            </ItemTemplate>
                        ))
                    ) : (
                        <ItemTemplate key={index} item={item}>
                            {configs && configs.shortcuts && (key in configs.shortcuts) ? (
                                configs.shortcuts[key]
                            ) : item.text}
                        </ItemTemplate>
                    )
                ))}
            </ul>
        </div>
    );
};

export default Shortcuts;