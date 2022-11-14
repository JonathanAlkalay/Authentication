
export interface Users {
    id: string;
    userName: string;
    passWord: string;
    phoneNumber: string;
    address: string;
}

export interface Employee extends Users {

}

export interface Boss extends Users {

}