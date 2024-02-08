export interface FormData {
  projectName: string;
  projectCode: string;
  projectManager: string;
  clientName: string;
  clientProjectManager: string;
  scope: number;
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
export interface VendorFormData {
  vendorCode: string;
  pauseVendor: boolean;
  scope: number;
  complete: string;
  terminate: string;
  overQuota: string;
}

export interface VendorListApiResponse {
  id: number;
  name: string;
  email: string;
}
