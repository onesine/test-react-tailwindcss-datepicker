import {RoundedButton} from "../utils";
import {generateArrayNumber} from "../../helpers";

const Years = ({year, clickYear}) => {
    return (
        <div className="w-full grid grid-cols-2 gap-2 mt-2">
            {generateArrayNumber(year, year + 11).map((item, index) => (
                <RoundedButton key={index} padding="py-3" onClick={() => {clickYear(item)}}>
                    {item}
                </RoundedButton>
            ))}
        </div>
    );
};

export default Years;