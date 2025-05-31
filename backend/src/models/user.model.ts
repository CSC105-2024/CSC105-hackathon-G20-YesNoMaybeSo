import { db } from "../index.ts";

export const isDuplicate = async (username: string) => {
    const user = await db.users.findFirst({
        where: {
            Username: username
        },
    });
    return user;
}

export const createUser = async (username: string, password: string) => {
    const user = await db.users.create({
        data: {
            Username: username,
            Password: password,
        },
    });
    return user;
}

export const getUserById = async (id: number) => {
    const user = await db.users.findUnique({
        where: {
            id: id
        },
    });
    return user;
}

export const getUserByUsername = async(userName: string) => {
    const user = await db.users.findFirst({
        where: {
            Username: userName,
        },
    })
    return user
}

export const editUserName = async(userId: number, userName: string) => {
    const user = await db.users.update({
        where: {
            id: userId,
        }, data: {
            Username: userName,
        }
    })
    return user;
}