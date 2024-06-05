import { Dropdown } from "./Dropdown";

export interface Navitems {
    name: string;
    slug: string;
    id: number;
    arrow:boolean;
    dropdown?:Dropdown[]
}
