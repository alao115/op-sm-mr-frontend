import serviceGenerator from "./serviceGenerator";

export default function interventionService ({ serviceName, http }) {
  return class interventionService extends serviceGenerator({ http, serviceName }) {
    
    async getAllByTractor({ tractor }) {
      return http.get(`/${serviceName}/bytractor/${tractor}`)
    }
  };
}
