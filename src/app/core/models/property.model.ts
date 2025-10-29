export interface PropertyMedia {
  id: string;
  mediaType: number; // 1 = Image, 2 = Video
  mediaUrl: string;
  mimeType?: string;
}

export interface PropertyDto {
  id: string;
  title: string;
  description?: string;
  city?: string;
  state?: string;
  country?: string;
  address?: string;
  price?: number;
  propertyType?: string;
  status?: string;
  availableFrom?: string;
  postedBy?: string;
  latitude?: number;
  longitude?: number;
  media?: PropertyMedia[];
}