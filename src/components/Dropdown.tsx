import { Link } from "react-router-dom";

export interface Dropdown {
    name: string;
    slug: string;
}

const Dropdown = ({ array }: { array: Dropdown[] }) => {
    return (
        <ul>
            {array.map((array) => (
                <li key={array.name}>
                    <Link to={array.slug}>{array.name}</Link>
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;
