import serviceGenerator from './serviceGenerator';
// import maintenanceService from './maintenance.service';
import reportService from './report.service';
import mainService from './main.service';
import logService from './log.service';
import tractorService from './tractor.service'
import maintenanceService from './maintenance.service';
import http, { authAxios } from './axios'
import authService from './auth.service';
import overviewService from './overview.service';
import interventionService from './intervention.service';

const servicesName = [
  'failures',
  'users',
  'mechanicals',
  'admins'
]

const servicesFunc = ({ http }) => {
  const services = {}

  servicesName.forEach(serviceName => {
    const tempName = serviceName.replace(/s$/, '')
    services[tempName + 'Service'] = new (serviceGenerator({ http: authAxios, serviceName }))()
  })
  return services
}

const service = () => ({
  ...servicesFunc({ http }),
  tractorService: new (tractorService({ http: authAxios, serviceName: 'tractors' }))(),
  reportService: new (reportService({ http: authAxios, serviceName: 'reports' }))(),
  mainService: new (mainService({ http: authAxios, serviceName: 'mainservices' }))(),
  maintenanceService: new (maintenanceService({ http: authAxios, serviceName: 'maintenances' }))(),
  interventionService: new (interventionService({ http: authAxios, serviceName: 'interventions' }))(),
  logService: new (logService({ http: authAxios, serviceName: 'cron' }))(),
  authService: new (authService({ http, authAxios }))(),
  overviewService: new (overviewService({ serviceName: 'overview', http: authAxios }))()
})

export default service