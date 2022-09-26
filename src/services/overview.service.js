export default function overviewService({ serviceName, http }) {
  return class OverviewService {
    getAllTractorByAtdaOverview() {
      return http.get(`/${serviceName}/tractorByAtda`);
    }

    getReportOverviewByAtda({ atda, valType, previousMonth }) {
      return http.post(`/${serviceName}/reportOverviewByAtda`, { atda, isAverage: valType, previousMonth });
    }

    getTractorOverview () {
      return http.get(`/${serviceName}/tractorOverview`)
    }
  };
}