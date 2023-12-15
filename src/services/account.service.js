import createApiClient from "./api.service";
class AccountService {
	constructor(baseUrl = "/api/accounts") {
		this.api = createApiClient(baseUrl);
	}
	
	async create(data) {
		return (await this.api.post("/", data)).data;
	}
	async login(data) {
		return (await this.api.post("/login", data)).data;
	}
	async get(id) {
		return (await this.api.get(`/${id}`)).data;
	}
	
	async delete(id) {
		return (await this.api.delete(`/${id}`)).data;
	}
	
}

export default new AccountService();