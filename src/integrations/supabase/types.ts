export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      batch_hives: {
        Row: {
          batch_id: string
          created_at: string
          hive_id: string
        }
        Insert: {
          batch_id: string
          created_at?: string
          hive_id: string
        }
        Update: {
          batch_id?: string
          created_at?: string
          hive_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "batch_hives_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_hives_hive_id_fkey"
            columns: ["hive_id"]
            isOneToOne: false
            referencedRelation: "hives"
            referencedColumns: ["id"]
          },
        ]
      }
      batches: {
        Row: {
          ai_recommendation: string | null
          ai_verdict: string | null
          beekeeper: string
          created_at: string
          floral: string
          forage_lat: number | null
          forage_lng: number | null
          forage_location: string | null
          harvest_end: string | null
          harvest_start: string | null
          harvested: string
          id: string
          jars: number
          name: string
          override_reason: string | null
          owner_id: string | null
          recommendation_followed: boolean | null
          region: string
          sealed_at: string | null
          status: string
          trust_score: number
        }
        Insert: {
          ai_recommendation?: string | null
          ai_verdict?: string | null
          beekeeper?: string
          created_at?: string
          floral?: string
          forage_lat?: number | null
          forage_lng?: number | null
          forage_location?: string | null
          harvest_end?: string | null
          harvest_start?: string | null
          harvested?: string
          id: string
          jars?: number
          name: string
          override_reason?: string | null
          owner_id?: string | null
          recommendation_followed?: boolean | null
          region?: string
          sealed_at?: string | null
          status?: string
          trust_score?: number
        }
        Update: {
          ai_recommendation?: string | null
          ai_verdict?: string | null
          beekeeper?: string
          created_at?: string
          floral?: string
          forage_lat?: number | null
          forage_lng?: number | null
          forage_location?: string | null
          harvest_end?: string | null
          harvest_start?: string | null
          harvested?: string
          id?: string
          jars?: number
          name?: string
          override_reason?: string | null
          owner_id?: string | null
          recommendation_followed?: boolean | null
          region?: string
          sealed_at?: string | null
          status?: string
          trust_score?: number
        }
        Relationships: []
      }
      hives: {
        Row: {
          activity_level: number
          colony_strength: number
          created_at: string
          humidity: number
          id: string
          last_inspected: string
          location: string | null
          name: string
          notes: string | null
          owner_id: string
          temperature: number
          weight_kg: number
        }
        Insert: {
          activity_level?: number
          colony_strength?: number
          created_at?: string
          humidity?: number
          id?: string
          last_inspected?: string
          location?: string | null
          name: string
          notes?: string | null
          owner_id: string
          temperature?: number
          weight_kg?: number
        }
        Update: {
          activity_level?: number
          colony_strength?: number
          created_at?: string
          humidity?: number
          id?: string
          last_inspected?: string
          location?: string | null
          name?: string
          notes?: string | null
          owner_id?: string
          temperature?: number
          weight_kg?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          apiary_name: string | null
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          location: string | null
          updated_at: string
        }
        Insert: {
          apiary_name?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          location?: string | null
          updated_at?: string
        }
        Update: {
          apiary_name?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          location?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      readings: {
        Row: {
          activity_level: number
          hive_id: string
          humidity: number
          id: string
          location: string | null
          notes: string | null
          owner_id: string
          recorded_at: string
          temperature: number
          weight_kg: number
        }
        Insert: {
          activity_level: number
          hive_id: string
          humidity: number
          id?: string
          location?: string | null
          notes?: string | null
          owner_id: string
          recorded_at?: string
          temperature: number
          weight_kg: number
        }
        Update: {
          activity_level?: number
          hive_id?: string
          humidity?: number
          id?: string
          location?: string | null
          notes?: string | null
          owner_id?: string
          recorded_at?: string
          temperature?: number
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "readings_hive_id_fkey"
            columns: ["hive_id"]
            isOneToOne: false
            referencedRelation: "hives"
            referencedColumns: ["id"]
          },
        ]
      }
      tasting_notes: {
        Row: {
          batch_id: string
          created_at: string
          id: string
          name: string | null
          note: string
          rating: number
        }
        Insert: {
          batch_id: string
          created_at?: string
          id?: string
          name?: string | null
          note: string
          rating: number
        }
        Update: {
          batch_id?: string
          created_at?: string
          id?: string
          name?: string | null
          note?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "tasting_notes_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      trail_steps: {
        Row: {
          actor_role: string | null
          batch_id: string
          block_hash: string | null
          created_at: string
          details: Json
          document_label: string | null
          document_url: string | null
          id: string
          note: string
          place: string
          position: number
          prev_hash: string | null
          stage: string
          step_date: string
          submitted_by: string | null
        }
        Insert: {
          actor_role?: string | null
          batch_id: string
          block_hash?: string | null
          created_at?: string
          details?: Json
          document_label?: string | null
          document_url?: string | null
          id?: string
          note?: string
          place?: string
          position?: number
          prev_hash?: string | null
          stage: string
          step_date?: string
          submitted_by?: string | null
        }
        Update: {
          actor_role?: string | null
          batch_id?: string
          block_hash?: string | null
          created_at?: string
          details?: Json
          document_label?: string | null
          document_url?: string | null
          id?: string
          note?: string
          place?: string
          position?: number
          prev_hash?: string | null
          stage?: string
          step_date?: string
          submitted_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trail_steps_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      ht_step_hash: {
        Args: {
          _batch: string
          _date: string
          _note: string
          _place: string
          _pos: number
          _prev: string
          _stage: string
        }
        Returns: string
      }
      public_batch_hives: {
        Args: { _batch_id: string }
        Returns: {
          location: string
          name: string
        }[]
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "beekeeper"
        | "lab"
        | "bottler"
        | "distributor"
        | "retailer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "beekeeper",
        "lab",
        "bottler",
        "distributor",
        "retailer",
      ],
    },
  },
} as const
