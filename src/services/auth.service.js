export default function authService({ http, authAxios }) {
  return class authService {
    async signup(data) {
      return http.post("/auth/signup", data);
    }

    async signin(data) {
      return http.post("/auth/signin", data);
    }

		async refreshToken(data) {
			return http.post("auth/refresh-token", data)
		}

    async getAuthUser(token = null) {
      if (token)
        authAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return authAxios.get("/users/authUser");
    }
  };
}
