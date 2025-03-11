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
      clube: {
        Row: {
          created_at: string | null
          escudo: string | null
          id: string
          nome: string
          nome_popular: string | null
          sigla: string | null
          slug: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          escudo?: string | null
          id?: string
          nome: string
          nome_popular?: string | null
          sigla?: string | null
          slug?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          escudo?: string | null
          id?: string
          nome?: string
          nome_popular?: string | null
          sigla?: string | null
          slug?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      partida: {
        Row: {
          created_at: string
          data: string | null
          gols_mandante: number | null
          gols_visitante: number | null
          hora: string | null
          id: string
          mandante: string | null
          numero: number | null
          rodada: number
          sede: string | null
          status: Database["public"]["Enums"]["status"]
          updated_at: string | null
          visitante: string | null
        }
        Insert: {
          created_at?: string
          data?: string | null
          gols_mandante?: number | null
          gols_visitante?: number | null
          hora?: string | null
          id?: string
          mandante?: string | null
          numero?: number | null
          rodada: number
          sede?: string | null
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string | null
          visitante?: string | null
        }
        Update: {
          created_at?: string
          data?: string | null
          gols_mandante?: number | null
          gols_visitante?: number | null
          hora?: string | null
          id?: string
          mandante?: string | null
          numero?: number | null
          rodada?: number
          sede?: string | null
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string | null
          visitante?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partida_mandante_fkey"
            columns: ["mandante"]
            isOneToOne: false
            referencedRelation: "clube"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partida_sede_fkey"
            columns: ["sede"]
            isOneToOne: false
            referencedRelation: "sede"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partida_visitante_fkey"
            columns: ["visitante"]
            isOneToOne: false
            referencedRelation: "clube"
            referencedColumns: ["id"]
          },
        ]
      }
      sede: {
        Row: {
          cidade: string | null
          created_at: string | null
          id: string
          key: string | null
          nome: string
          nome_popular: string
          updated_at: string | null
        }
        Insert: {
          cidade?: string | null
          created_at?: string | null
          id?: string
          key?: string | null
          nome: string
          nome_popular: string
          updated_at?: string | null
        }
        Update: {
          cidade?: string | null
          created_at?: string | null
          id?: string
          key?: string | null
          nome?: string
          nome_popular?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      simulacao: {
        Row: {
          created_at: string
          gols_mandante: number | null
          gols_visitante: number | null
          id: string
          partida: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          gols_mandante?: number | null
          gols_visitante?: number | null
          id?: string
          partida: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          gols_mandante?: number | null
          gols_visitante?: number | null
          id?: string
          partida?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "simulacao_partida_fkey"
            columns: ["partida"]
            isOneToOne: false
            referencedRelation: "partida"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      status:
        | "nao_iniciada"
        | "iniciada"
        | "finalizada"
        | "cancelada"
        | "wo"
        | "postergada"
        | "simulada"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
