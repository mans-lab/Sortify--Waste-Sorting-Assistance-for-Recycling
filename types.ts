
export interface WasteResult {
  itemName: string;
  category: 'Recyclable' | 'Organic' | 'Hazardous' | 'E-Waste' | 'General';
  instructions: string;
  upcyclingIdea: string;
  timestamp?: string;
}

export interface AuthUser {
  name: string;
  email: string;
}

export interface DisposalCenter {
  id: string;
  name: string;
  address: string;
  type: string;
  distance?: string;
}

export type RequestStatus = 'Pending' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
export type ServiceType = 'General Waste' | 'Recycling' | 'Bulk Pickup' | 'Hazardous Waste';

export interface ServiceRequest {
  id: string;
  type: ServiceType;
  date: string;
  status: RequestStatus;
  address: string;
  description: string;
  createdAt: string;
}

/* Added missing routes: Learn, Find, Contact, Request, Tracking */
export enum PageRoute {
  Home = 'home',
  AI = 'ai',
  Signup = 'signup',
  Login = 'login',
  Learn = 'learn',
  Find = 'find',
  Contact = 'contact',
  Request = 'request',
  Tracking = 'tracking'
}
