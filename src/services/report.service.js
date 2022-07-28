import serviceGenerator from "./serviceGenerator";

export default function ReportService({ serviceName, http }) {
  return class reportService extends serviceGenerator({ http, serviceName }) {
    async executeReport(data) {
      return http.post(`/${serviceName}/reportStats`, data);
    }
    async executeReportbyATDA(data) {
      return http.post(`/${serviceName}/reportStatByATDA`, data);
    }

    async downloadReportStat(data) {
      http.defaults.responseType = 'blob'
      return http.post(`${serviceName}/exportReportStatsToXlsx`, data)
    }

    async downloadReportToExcel(data) {
      http.defaults.responseType = 'blob'
      return http.post(`${serviceName}/exportToXlsx`, data)
    }
  };
}