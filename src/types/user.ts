// represents the type for the record mongoose saves into the db
import { Document } from "mongoose";

interface Address {
    addr1: string;
    addr2: string;
    city: string;
    country: string;
    postal: string;
}

export interface User extends Document {
    username: string;
    readonly password: string;
    seller: boolean;
    address: Address;
    created: Date;
}
