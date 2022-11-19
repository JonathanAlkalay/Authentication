import { hash, compare, genSalt} from 'bcrypt';


export const hashPassword = async (password: string): Promise<string> => {

    const salt = await genSalt(15);
    return hash(password, salt);
}

export const comparePasswordToHash = async (password: string, hash: string): Promise<boolean> => {

    if(!password || !hash)
        return false;
        
    return compare(password, hash);
}