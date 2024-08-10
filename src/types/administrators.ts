export default interface AdministratorsType {
    id?: string | null ;
    name: string | null;
    position: string | null;
    shift: string | null;
    address: string | null;
    image?: string | null | File;
    department: string | null;
    education: string | null;
    joiningDate: string | null;
    number: string | null;
    email: string | null;
    gender: string | null;
    pastInstitute?: string | null;
}
