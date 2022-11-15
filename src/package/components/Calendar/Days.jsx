import {useCallback, useContext} from "react";
import dayjs from "dayjs";
import {DatepickerContext} from "../../index";
import {formatDate, getTextColorByPrimaryColor, nextMonth, previousMonth} from "../../helpers";
import {BG_COLOR} from "../../constants";

const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween)

const Days = ({calendarData, onClickPreviousDays, onClickDay, onClickNextDays}) => {
    // Contexts
    const {primaryColor, period, changePeriod, dayHover, changeDayHover} = useContext(DatepickerContext);

    // Functions
    const currentDateClass = useCallback((item) => {
        const itemDate = `${calendarData.date.year()}-${calendarData.date.month() + 1}-${item >= 10 ? item : "0"+item}`;
        if (formatDate(dayjs()) === formatDate(dayjs(itemDate)))
            return getTextColorByPrimaryColor(primaryColor)
        return "";
    }, [calendarData.date, primaryColor]);

    const activeDateData = useCallback((day) => {
        const fullDay = `${calendarData.date.year()}-${calendarData.date.month() + 1}-${day}`;
        let className = "";
        if ((dayjs(fullDay).isSame(period.start) && dayjs(fullDay).isSame(period.end))) {
            className = ` ${BG_COLOR["500"][primaryColor]} text-white font-medium rounded-full`;
        } else if (dayjs(fullDay).isSame(period.start)) {
            className = ` ${BG_COLOR["500"][primaryColor]} text-white font-medium ${(dayjs(fullDay).isSame(dayHover) && !period.end) ? "rounded-full" : "rounded-l-full"}`;
        } else if(dayjs(fullDay).isSame(period.end)) {
            className = ` ${BG_COLOR["500"][primaryColor]} text-white font-medium ${(dayjs(fullDay).isSame(dayHover) && !period.start) ? "rounded-full" : "rounded-r-full"}`;
        }

        return {
            active: dayjs(fullDay).isSame(period.start) || dayjs(fullDay).isSame(period.end),
            className: className
        }
    }, [calendarData.date, dayHover, period.end, period.start, primaryColor]);

    const hoverClassByDay = useCallback((day) => {
        let className = currentDateClass(day);
        const fullDay = `${calendarData.date.year()}-${calendarData.date.month() + 1}-${day >= 10 ? day : "0"+day}`;

        if (period.start && period.end && dayjs(fullDay).isBetween(period.start, period.end, 'day', '[)')) {
            return ` ${BG_COLOR["100"][primaryColor]} ${currentDateClass(day)} dark:bg-white/10`;
        }

        if (!dayHover) {
            return className;
        }


        if (period.start && dayjs(fullDay).isBetween(period.start, dayHover, 'day', '[)')) {
            className = ` ${BG_COLOR["100"][primaryColor]} ${currentDateClass(day)} dark:bg-white/10`;
        }

        if (period.end && dayjs(fullDay).isBetween(dayHover, period.end, 'day', '[)')) {
            className = ` ${BG_COLOR["100"][primaryColor]} ${currentDateClass(day)} dark:bg-white/10`;
        }

        if (dayHover === fullDay) {
            className = ` transition-all duration-500 ${BG_COLOR["500"][primaryColor]} text-white font-medium ${period.start ? 'rounded-r-full' : 'rounded-l-full'}`;
        }

        return className;
    }, [calendarData.date, currentDateClass, dayHover, period.end, period.start, primaryColor]);

    const buttonCass = useCallback((day) => {
        const baseClass = `flex items-center justify-center w-full h-12 lg:w-10 lg:h-10`;
        return `${baseClass}${!activeDateData(day).active ? ` ${hoverClassByDay(day)}` : activeDateData(day).className}`
    }, [activeDateData, hoverClassByDay]);

    const hoverDay = useCallback((day, type) => {
        const object = {
            previous: previousMonth(calendarData.date),
            current: calendarData.date,
            next: nextMonth(calendarData.date),
        }
        const newDate = object[type];
        const newHover = `${newDate.year()}-${newDate.month() + 1}-${day >= 10 ? day : "0"+day}`;

        if (period.start && !period.end) {
            if (dayjs(newHover).isBefore(dayjs(period.start))) {
                changePeriod({
                    start: null,
                    end: period.start
                });
            }
            changeDayHover(newHover);
        }

        if (!period.start && period.end) {
            if (dayjs(newHover).isAfter(dayjs(period.end))) {
                changePeriod({
                    start: period.end,
                    end: null
                });
            }
            changeDayHover(newHover);
        }
    }, [calendarData.date, changeDayHover, changePeriod, period.end, period.start])

    return (
        <div className="grid grid-cols-7 gap-y-0.5 my-1">
            {calendarData.days.previous.map((item, index) => (
                <button
                    key={index}
                    className="flex items-center justify-center text-gray-400 w-full h-12 lg:w-10 lg:h-10"
                    onClick={() => onClickPreviousDays(item)}
                    onMouseOver={() => {hoverDay(item, "previous")}}
                >
                    {item}
                </button>
            ))}

            {calendarData.days.current.map((item, index) => (
                <button
                    key={index}
                    className={buttonCass(item)}
                    onClick={() => {onClickDay(item)}}
                    onMouseOver={() => {hoverDay(item, "current")}}
                >
                    {item}
                </button>
            ))}

            {calendarData.days.next.map((item, index) => (
                <button
                    key={index}
                    className="flex items-center justify-center text-gray-400 w-full h-12 lg:w-10 lg:h-10"
                    onClick={() => {onClickNextDays(item)}}
                    onMouseOver={() => {hoverDay(item, "next")}}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

export default Days;