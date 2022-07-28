import serviceGenerator from "./serviceGenerator";

export default function logService({ serviceName, http }) {
  return class maintenanceService extends serviceGenerator({ http, serviceName }) {
    async getLogs() {
      // return http.get(`/${serviceName}/logs`);
      return new EventSource('http://localhost:5000/cron/logs')
    }
  };
}
