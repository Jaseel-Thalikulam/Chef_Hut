import userModel from "../models/user.model";

export async function generateOTP() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

export async function usernameGenerator(name: string): Promise<string> {
  let username = "";
  const firstName = name.split(" ")[0]; // Get the first name

  do {
    const randomNumber = Math.floor(Math.random() * 1000);
    username = `${firstName}${randomNumber}`;
  } while (await checkIfUsernameExists(username)); // Check if the username exists

  return username;
}

async function checkIfUsernameExists(username: string) {
  return (await userModel.findOne({ username: username })) != null;
}
