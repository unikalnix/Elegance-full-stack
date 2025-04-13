import bcrypt from "bcrypt";

const genHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error(error);
  }
};

const compareHash = async (password, hash) => {
  try {
    const isVerified = await bcrypt.compare(password, hash);
    return isVerified;
  } catch (error) {
    throw new Error(error);
  }
};

export { genHash, compareHash };
