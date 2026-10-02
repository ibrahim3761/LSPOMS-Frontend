export interface IPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePackagePayload {
  name: string;
  description: string;
  price: number;
  durationDays: number;
}

export interface UpdatePackagePayload {
  name?: string;
  description?: string;
  price?: number;
  durationDays?: number;
}