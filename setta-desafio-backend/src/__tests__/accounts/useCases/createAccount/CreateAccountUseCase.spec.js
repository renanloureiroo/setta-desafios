import { CreateAccountUseCase } from "../../../../modules/accounts/useCases/createAccount/CreateAccountUseCase";

let createAccountUseCase;

describe("CreateAccountUseCase", () => {
  beforeAll(() => {
    createAccountUseCase = new CreateAccountUseCase();
  });

  it("should be able to create a new account", async () => {
    const user = await createAccountUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmai.com",
      password: "123456",
    });
    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new account with already registered", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@gmai.com",
      password: "123456",
    };
    await createAccountUseCase.execute(user);

    expect(async () => {
      await createAccountUseCase.execute(user);
    }).rejects.toTrow("Email already exists!");
  });
});
