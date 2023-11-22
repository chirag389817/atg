export const APIRoutes = {
    dashboard: {
        lable: "Dashboard",
        href: "/dashboard",
        inSidebar: true
    },
    departments: {
        lable: "Departments",
        href: "/dashboard/departments",
        structure: "/dashboard/departments/structure",
        inSidebar: true
    },
    subjects: {
        lable: "Subjects",
        href: "/dashboard/subjects",
        inSidebar: true
    },
    faculties: {
        lable: "Faculties",
        href: "/dashboard/faculties",
        inSidebar: true
    },
    rooms: {
        lable: "Rooms",
        href: "/dashboard/rooms",
        inSidebar: true
    },
    slots: {
        lable: "Slots",
        href: "/dashboard/slots",
        inSidebar: true
    },
    profile: {
        lable: "Profile",
        href: "/profile",
        inSidebar: false
    },
    login: {
        lable: "Login",
        href: "/auth/login/",
        inSidebar: false
    },
    signup: {
        lable: "Signup",
        href: "/auth/signup",
        inSidebar: false
    },
    register: {
        lable: "Register",
        href: "/api/auth/register",
        inSidebar: false
    },
    api: {
        inSidebar: false,
        departments: "/api/departments",
        structure: "/api/structure"
    }
};
