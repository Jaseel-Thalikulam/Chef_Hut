interface IAddress {
    country: string;
    state: string;
    postalCode: string;
}

export interface IUser {
    avatarUrl: string;
    contactNumber: string;
    email: string;
    username: string;
    name: string;
    _id: string;
    bio?: string;
    address?: IAddress;
}