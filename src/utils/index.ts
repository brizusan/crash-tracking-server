import bcryptjs from "bcryptjs";

export const hassPassword = async (password: string) => {
  const gentSalt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, gentSalt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcryptjs.compare(password, hashedPassword);
};

export const generateToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
