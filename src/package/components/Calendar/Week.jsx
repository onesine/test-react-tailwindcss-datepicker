import {useContext} from "react";
import dayjs from "dayjs";
import {loadLanguageModule, shortString, ucFirst} from "../../helpers";
import {DatepickerContext} from "../../index";

const Week = () => {
    const {i18n} = useContext(DatepickerContext);
    loadLanguageModule(i18n);

    return (
        <div className="grid grid-cols-7 border-b border-gray-300 dark:border-gray-700 py-2">
            {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (
                <div key={index} className="tracking-wide text-gray-500 text-center">
                    {
                        ucFirst(shortString(dayjs(`2022-11-${6 + item}`).locale(i18n).format("ddd")))
                    }
                </div>
            ))}
        </div>
    );
};

export default Week;