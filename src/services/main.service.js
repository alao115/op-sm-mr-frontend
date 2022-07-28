import serviceGenerator from "./serviceGenerator";

export default function mainService({ serviceName, http }) {
  return class mainService extends serviceGenerator({ http, serviceName }) {
//     async executeReport(data) {
//       return http.post(`/${serviceName}/tractor/deplacementStats`, data);
//     }
    async executeReportFromGurtam(data) {
      return http.post(`/${serviceName}/executeReportFromGurtam`, data);
    }
  };
}
