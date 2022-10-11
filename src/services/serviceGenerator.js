export default function serviceGen ({ serviceName, http }) {
  return class genericService {
    async getAll({ page = 0, limit = 10 }) {
      return await http.get(`/${serviceName}?page=${page}&limit=${limit}`);
    }

    async create(data) {
      return await http.post(`/${serviceName}`, data);
    }

    async getAllByAtda(atda) {
      return await http.get(`/${serviceName}/ByATDA/${atda}`)
    }
    
    async fineSearch(data) {
      return await http.post(`/${serviceName}/fineSearch`, data)
    }

    async update(entityID, data) {
      return await http.patch(`/${serviceName}/${entityID}`, data)
    }
  };
}