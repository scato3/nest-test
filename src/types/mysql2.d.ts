declare module 'mysql2/promise' {
  export interface Pool {
    query(sql: string, values?: any[]): Promise<any>;
  }

  export function createPool(config: any): Pool;
}
