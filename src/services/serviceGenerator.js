export default function serviceGen ({ serviceName, http }) {
  return class genericService {
    async getAll() {
      return await http.get(`/${serviceName}`);
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