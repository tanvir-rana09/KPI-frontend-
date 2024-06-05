import { Navitems } from "../types/Navbar.type";

const navbarItems: Navitems[] = [
    {
        name: "Home",
        id: 1,
        slug: "/",
        arrow: false,
    },
    {
        name: "Administrators",
        id: 2,
        arrow: true,
        slug:"/administrators",
        dropdown: [
            {
                name: "Teacher",
                slug: "/administrators/teacher",
            },
            {
                name: "Staff",
                slug: "/administrators/staff",
            },
        ],
    },
    {
        name: "Students",
        id: 3,
        slug:"/students",
        arrow: true,
        dropdown: [
            {
                name: "1 Semester",
                slug: "/students/first-semester",
            },
            {
                name: "2 Semester",
                slug: "/students/second-semester",
            },
            {
                name: "3 Semester",
                slug: "/students/third-semester",
            },
            {
                name: "4 Semester",
                slug: "/students/four-semester",
            },
            {
                name: "5 Semester",
                slug: "/students/five-semester",
            },
            {
                name: "6 Semester",
                slug: "/students/six-semester",
            },
            {
                name: "7 Semester",
                slug: "/students/seven-semester",
            },
            {
                name: "8 Semester",
                slug: "/students/eight-semester",
            },
        ],
    },
    {
        name: "Photos",
        id: 4,
        slug: "/photos",
        arrow: false,
    },
    {
        name: "Notice",
        id: 5,
        slug: "/notice",
        arrow: false,
    },
    {
        name: "About",
        id: 6,
        slug: "/about",
        arrow: false,
    },
];

export default navbarItems;
