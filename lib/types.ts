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
}

// ─── User / Profile ─────────────────────────────────────────────────
export interface SetupStep1Request {
  username: string;
  inAppName: string;
  profession: string;
}

export interface InterestItem {
  category: string;
  interest: string;
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
  interests?: InterestItem[];
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

// ─── Generic API response wrapper ───────────────────────────────────
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
