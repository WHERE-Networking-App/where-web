// ─── Auth ────────────────────────────────────────────────────────────
export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  message: string;
  token: string;
  userId: number;
  setupCompleted: boolean;
  emailVerified: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  userId: number;
  setupCompleted: boolean;
  emailVerified: boolean;
}

// ─── User / Profile ─────────────────────────────────────────────────
export interface SetupStep1Request {
  username: string;
  inAppName: string;
  profession: string;
}

export interface InterestItem {
  id?: number;
  user_id?: number;
  category: string;
  interest: string;
  created_at?: string;
}

export interface SetupStep2Request {
  interests: InterestItem[];
}

export interface UserProfile {
  id: number;
  email: string;
  username: string;
  inAppName: string;
  profession: string;
  setupCompleted: boolean;
}

/** Shape returned by GET /api/users/profile */
export interface UserProfileApiResponse {
  user: UserProfile;
  interests: InterestItem[];
}

// ─── Meetup ──────────────────────────────────────────────────────────
export interface CreateMeetupRequest {
  title: string;
  description?: string;
  date: string;
  timeSlot: "Morning" | "Noon" | "Evening" | "Night";
  city: string;
  location?: string;
  vibe: "Coffee" | "Beer" | "Coworking";
  participantsLimit: number;
}

export interface MeetupParticipant {
  id?: number;
  userId?: number;
  inAppName?: string;
  name?: string;
  status?: string;
  reached?: boolean;
  reachedAt?: string;
  note?: string;
}

export interface Meetup {
  id: number;
  title: string;
  description?: string;
  date: string;
  timeSlot: string;
  city: string;
  location?: string;
  vibe: string;
  participantsLimit: number;
  status?: string;
  cancelled?: boolean;
  hostId?: number;
  host?: {
    id: number;
    username: string;
    inAppName: string;
  };
  participants: MeetupParticipant[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UpComingMeetup {
  id: number;
  city: string;
  createdAt: string;
  date: string;
  description: string | null;
  hostId: number;
  isFull: boolean;
  isParticipant: boolean;
  location: string;
  participantCount: number;
  participantsLimit: number;
  status: string;
  timeSlot: string;
  title: string;
  updatedAt: string;
  vibe: string;
}

/** Body for POST /api/meetups/{id}/reach */
export interface MeetupReachRequest {
  note?: string;
}

/** Response for POST /api/meetups/{id}/cancel and reach */
export interface MeetupActionResponse {
  message: string;
}

// ─── Places ──────────────────────────────────────────────────────────

/** DTO returned by GET /api/places and GET /api/places/{id} */
export interface Place {
  id: number;
  name: string;
  city: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  place_type?: string;
  description?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

/** Query params accepted by GET /api/places */
export interface PlaceQuery {
  city?: string;
  search?: string;
}

/** Body for POST /api/places */
export interface CreatePlaceRequest {
  name: string;
  city: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  place_type?: string;
  description?: string;
  rating?: number;
}

// ─── Generic API response wrapper ───────────────────────────────────
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
