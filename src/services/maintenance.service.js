import serviceGenerator from "./serviceGenerator";

export default function maintenanceService ({ serviceName, http }) {
  return class maintenanceService extends serviceGenerator({ http, serviceName }) {
    async getAllCheckMaintenances() {
      return http.get(`/${serviceName}/checkmaintenances`);
    }

    async create(data) {
      return http.post(`/${serviceName}/`, data)
    }

    async getAllByTractor({ tractor }) {
      return http.get(`/${serviceName}/bytractor/${tractor}`)
    }
  };
}
