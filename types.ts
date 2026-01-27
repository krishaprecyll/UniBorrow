
export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  verified: boolean;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  feePerDay: number;
  rating: number;
  owner: User;
  imageUrl: string;
  availability: 'available' | 'rented' | 'maintenance';
}

export interface SafeZone {
  id: string;
  name: string;
  location: string;
  hours: string;
  securityFeatures: string[];
}

export enum Category {
  Electronics = 'Electronics',
  Outdoors = 'Outdoors',
  Textbooks = 'Textbooks',
  Transport = 'Transport',
  Photography = 'Photography',
  Tools = 'Tools'
}
