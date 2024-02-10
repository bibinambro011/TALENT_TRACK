import bcrypt from 'bcrypt';

export const hashedPass = async (password: string): Promise<string> => {
    try {
        const hashedPass = await bcrypt.hash(password, 10);
        return hashedPass;
    } catch (error:any) {
        console.log(error.message);
        throw new Error('Error hashing password');
    }
};

export  const comparePass = async (password: string, hashedPass: string): Promise<boolean> => {
    try {
        const match = await bcrypt.compare(password, hashedPass);
        return match;
    } catch (error:any) {
        console.log(error.message);
        throw new Error('Error comparing passwords');
    }
};
