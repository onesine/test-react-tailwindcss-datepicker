import {useState} from "react";
import Datepicker from "react-tailwindcss-datepicker";
// import Datepicker from "./package";

const App = () => {
    const [period, setPeriod] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });

    return (
        <div className="min-h-screen max-h-screen dark:bg-slate-900 pt-8 md:pt-0 flex md:items-center justify-center px-4">
           <div className="w-full lg:w-2/3 p-4 h-96 flex justify-start -mt-16 rounded-md bg-gray-100 border shadow-sm dark:bg-slate-900 dark:border-slate-600">
                <div className="w-full md:w-3/4 lg:w-2/4 pt-8 lg:pt-5">
                    <Datepicker
                        i18n={"en"}
                        primaryColor={"fuchsia"}
                        /*configs={{
                            shortcuts: {
                                today: "Aujourd'hui",
                                yesterday: "Hier",
                                past: period => `Les ${period} derniers jours`,
                                currentMonth: "Ce mois-ci",
                                pastMonth: "Le mois dernier",
                            },
                            footer: {
                                cancel: "Quitter",
                                apply: "Appliquer"
                            }
                        }}*/
                        asSingle={false}
                        // placeholder={"My placehoder"}
                        // separator={"to"}
                        // startFrom={new Date(2020, 0, 1)}
                        useRange={true}
                        showFooter={true}
                        showShortcuts={true}
                        value={period}
                        onChange={value => {
                            console.log("value:", value);
                            setPeriod(value)
                        }}
                    />
                </div>
           </div>
        </div>
    );
};

export default App;