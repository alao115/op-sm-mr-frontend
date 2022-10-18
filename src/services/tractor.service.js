import serviceGenerator from "./serviceGenerator";

export default function tractorService({ serviceName, http }) {
  return class tractorService extends serviceGenerator({ http, serviceName }) {
    async getTractorHS(_, config) {
      console.log(config)
      return http.get(`/${serviceName}/hs`, config);
    }

    async exportAllTractorToExcel(data) {
      http.defaults.responseType = 'blob'
      return http.get(`${serviceName}/exportAllToXlsx`, data)
    }

    async exportAllTractorHSToExcel(data) {
      http.defaults.responseType = 'blob'
      return http.get(`${serviceName}/exportAllHSToXlsx`, data)
    }
  };
}