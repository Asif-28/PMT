export interface FormData {
  projectName: string;
  projectCode: string;
  projectManager: string;
  clientName: string;
  clientProjectManager: string;
  incidenceRate: string;
  loi: string;
  targetDescription: string;
  onlineOffline: string;
  billingComments: string;
  securityCheck: boolean;
}

export interface ClientFormData {
  inputField: string;
  countryCode: string;
  scope: number;
  testLink: string;
  liveLink: string;
  checkcountry: boolean;
  checkQuota: boolean;
}
