export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      links: {
        Row: {
          clicks: number
          created_at: string
          id: string
          original_url: string
          short_code: string
          user_id: string | null
        }
        Insert: {
          clicks?: number
          created_at?: string
          id?: string
          original_url: string
          short_code: string
          user_id?: string | null
        }
        Update: {
          clicks?: number
          created_at?: string
          id?: string
          original_url?: string
          short_code?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}