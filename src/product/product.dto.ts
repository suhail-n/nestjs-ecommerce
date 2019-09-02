import { User } from "../types/user";

export interface CreateProductDTO {
    owner: User,
    title: string,
    description: string,
    image: string,
    price: number,
}

// partial means it can have any of the CreateProductDTO fields but it's all optional
export type UpdateProductDTO = Partial<CreateProductDTO>;