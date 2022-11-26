import { VaultModel } from "./vault.model";

interface ICreateVault {
  user: string;
  salt: string;
}

// create vault
export async function createVault(input: ICreateVault) {
  return await VaultModel.create(input);
}
