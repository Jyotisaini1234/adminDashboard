export interface TourPackage {
  id?: string;
  packageDetails: {
    packageName: string;
    validity: { startDate: string; endDate: string };
    country: string;
    destinations: string[];
    travelDates: { start: string; end: string };
    passengers: { adult: number; child: number; infant: number };
    hotelOption: HotelOption[];
    activity: Activity[];
    transfers: Transfer[];
    inclusions: string[];
    exclusions: string[];
    itinerary: ItineraryItem[];
    cancellationPolicy: CancellationPolicy;
    importantNotes: string[];
    img: string;
  };
}

export interface HotelOption {
  hotels: HotelInPackage[];
  cnbCost: number;
  cwbCost: number;
  perPersonCost: number;
  totalPackageCost: number;
}

export interface HotelInPackage {
  name: string;
  destination: string;
  star: number;
  price: number;
  currency: string;
  img: string;
  nights: number;
  mealPlan: string;
  roomType: string;
}

export interface Transfer {
  route: string;
  vehicle: string;
  type: string;
}

export interface ItineraryItem {
  day: number;
  date: string;
  title: string;
  price?: number;
  details: string;
}

export interface CancellationPolicy {
  before30Days: string;
  before21Days: string;
  before15Days: string;
  nonRefundablePeriods: string;
  notes: string;
}

export interface SightTour {
  imgUrl: string;
  id?: number;
  city: string;
  state: string;
  country: string;
  sightName: string;
  sightEntranceFee: number;
  additionalSicPerPax: number;
  currency: string;
  eventDuration: string;
  isEntranceIncluded: boolean;
  validFrom: string;
  validUntil: string;
  cityId: string;
  sightCode: string;
  description: string;
}

export interface Hotels {
  id?: string;
  hotel: {
    hotelName: string;
    location: {
      city: string;
      area: string;
      country: string;
    };
    description: string;
    imageUrl: string;
    availabilityStatus: boolean;
    isBestSeller: boolean;
    starRating: number;
    rooms: Room[];
  };
}


export interface OccupancyPricing {
  occupancy: number;
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
  mealPlan: string;
  status: string;
}

export interface CarType {
  id?: number;
  sightCode: string;
  sightName: string;
  carType: string;
  maxAllowedPax: number;
  price: number;
  currency: string;
  validFrom: string;
  validUntil: string;
}



export interface HotelDetails {
  hotelName: string;
  location: Location;
  description: string;
  imageUrl: string;
  rooms: Room[];
  availabilityStatus: boolean;
  isBestSeller: boolean;
  starRating: number;
}

export interface Location {
  city: string;
  area: string;
  country: string;
}

export interface Room {
  roomCategory: string;
  occupancyPricing: OccupancyPricing[];
  childPolicy: ChildPolicy;
}

export interface OccupancyPricing {
  occupancy: number;
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
  mealPlan: string;
  status: string;
}

export interface ChildPolicy {
  infants: Infant;
  children: Children[];
}

export interface Infant {
  ageRange: string;
  price: string;
}

export interface Children {
  ageRange: string;
  price: string;
}

export interface RoomRequest {
  adults: number;
  cwb: number;
  cnb: number;
  infant: number;
}

export interface HotelFormProps {
  hotel: Hotels | null;
  mode: string;
  onSave: (data: any) => void;
  onCancel: () => void;
}
export interface Activity {
  id?: string;
  sightCode: string;
  activityName: string;
  description?: string;
  duration: string;
  price?: number;
  currency?: string;
  isIncluded?: boolean;
  maxParticipants?: number;
  minAge?: number;
  difficultyLevel?: 'Easy' | 'Moderate' | 'Challenging' | 'Difficult' | 'Expert';
  category?: string;
  bookingRequired?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HotelOption {
  hotels: Hotel[];
  cnbCost: number;
  cwbCost: number;
  perPersonCost: number;
  totalPackageCost: number;
}

export interface Hotel {
  name: string;
  destination: string;
  star: number;
  price: number;
  currency: string;
  img: string;
  nights: number;
  mealPlan: string;
  roomType: string;
}

export interface Activity {
  name: string;
  type: string;
  vehicle: string;
  ticketIncluded: boolean;
  dropOff: string;
}

export interface Transfer {
  route: string;
  vehicle: string;
  type: string;
}

export interface Itinerary {
  day: number;
  date: string;
  title: string;
  price: number;
  details: string;
}

export interface PackageFormProps {
  package: TourPackage | null;
  mode: string;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const cityCountryList = [
  'Baku',
  'Tbilisi', 
  'Batumi',
  'Kutaisi',
  'Bakuriani',
  'Gabala',
  'Sheki',
  'Shahday'
];