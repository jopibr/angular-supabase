import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Base } from "../models/base.model";
import { CrudI } from "./crud.interface";

export class DataBaseService<T extends Base> implements CrudI<T>{

    table: string;
    SUPABASE_KEY = '';
    SUPABASE_URL = ""
    supabase: SupabaseClient;

    constructor(table: string) {
        this.supabase = createClient(this.SUPABASE_URL, this.SUPABASE_KEY);
        this.table = table;
    }

     async get(t: T) {
        const data = await this.supabase
        .from<T>(this.table)
        .select('*')
        .match({id: t.id})
        .single();

        return data;
    }
    async getAll(limit?: number) {
       const query = this.supabase.from<T>(this.table).select('*')
       
       if(limit){
           query.limit(limit)
       }
       const data = await query;
       return data.data;
    }

    async add(t: T) {
      const {data, error } = await this.supabase
      .from<T>(this.table)
      .insert(t);

      return {data, error};
    }

    async update(t: T) {
        const {data, error } = await this.supabase
        .from<T>(this.table)
        .update(t)
        .match({id: t.id});

        return {data, error};
    }
   
    async delete(t: T) {
        const {data, error } = await this.supabase
        .from<T>(this.table)
        .delete()
        .match({id: t.id});

        return {data, error};
    }

}