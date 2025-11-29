/**
 * Types générés pour la base de données Supabase nkri-prod-v2
 * Basés sur l'analyse du schéma existant
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      utilisateurs: {
        Row: {
          user_id: string
          email: string
          full_name: string | null
          tenant_id: string
          role: 'admin' | 'manager' | 'agent'
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          email: string
          full_name?: string | null
          tenant_id: string
          role?: 'admin' | 'manager' | 'agent'
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          email?: string
          full_name?: string | null
          tenant_id?: string
          role?: 'admin' | 'manager' | 'agent'
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          tenant_id: string
          title: string
          city: string | null
          capacity: number | null
          status: 'active' | 'inactive' | 'archived'
          platform: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          title: string
          city?: string | null
          capacity?: number | null
          status?: 'active' | 'inactive' | 'archived'
          platform?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          title?: string
          city?: string | null
          capacity?: number | null
          status?: 'active' | 'inactive' | 'archived'
          platform?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          tenant_id: string
          property_id: string
          guest_name: string
          check_in: string
          check_out: string
          total_amount: number | null
          currency: string
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          platform: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          property_id: string
          guest_name: string
          check_in: string
          check_out: string
          total_amount?: number | null
          currency?: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          platform?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          property_id?: string
          guest_name?: string
          check_in?: string
          check_out?: string
          total_amount?: number | null
          currency?: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          platform?: string | null
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          tenant_id: string
          property_id: string
          title: string
          assignee: string | null
          due_date: string | null
          status: 'open' | 'in_progress' | 'done' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          property_id: string
          title: string
          assignee?: string | null
          due_date?: string | null
          status?: 'open' | 'in_progress' | 'done' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          property_id?: string
          title?: string
          assignee?: string | null
          due_date?: string | null
          status?: 'open' | 'in_progress' | 'done' | 'cancelled'
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

// Types utilitaires
export type Tenant = Database['public']['Tables']['tenants']['Row']
export type User = Database['public']['Tables']['utilisateurs']['Row']
export type Property = Database['public']['Tables']['properties']['Row']
export type Reservation = Database['public']['Tables']['reservations']['Row']
export type Task = Database['public']['Tables']['tasks']['Row']

export type PropertyWithRelations = Property & {
  reservations?: Reservation[]
  tasks?: Task[]
}

export type ReservationWithProperty = Reservation & {
  property?: Property
}

export type TaskWithProperty = Task & {
  property?: Property
}
