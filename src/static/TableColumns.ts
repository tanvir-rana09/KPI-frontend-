const StudentsColumns = [
    {name:"id",search:false},
    {name:"image",search:false},
    {name:"name",search:true},
    {name:"roll",search:true},
    {name:"registration",search:true},
    {name:"semester",search:false},
    {name:"shift",search:false},
    {name:"group",search:false},
    {name:"captain",search:false},
    {name:"gmail",search:false},
    {name:"number",search:false},
    {name:"gender",search:false},
    {name:"session",search:false},
];
const AdministratorColumn = [
    { name: "id", search:false },
    { name: "image", search: false },
    { name: "name", search: true },
    { name: "position", search: false },
    { name: "shift", search: false },
    { name: "address", search: false },
    { name: "department", search: true },
    { name: "education", search: false },
    { name: "joiningDate", search: false },
    { name: "number", search: true },
    { name: "email", search: true },
    { name: "gender", search: true },
    { name: "pastInstitute", search: false },
];

export { StudentsColumns, AdministratorColumn };
