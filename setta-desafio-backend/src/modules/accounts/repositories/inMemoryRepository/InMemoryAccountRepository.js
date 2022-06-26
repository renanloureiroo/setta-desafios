class InMemoryAccountRepository {
  accounts
  constructor() {
    this.accounts = []
  }
  async create({ name, email, password }) {
    const account = {
      id: String(this.accounts.length + 1),
      name: name,
      email,
      password,
    }
    this.accounts.push(account)

    return user
  }

  async findByEmail(email) {
    const account = this.accounts.find((account) => account.email === email)

    return account
  }
}

export { InMemoryAccountRepository }
