import { createConfig } from "ponder";

import { LendingPoolAbi } from "./abis/LendingPoolAbi";
import { LendingPoolFactoryAbi } from "./abis/LendingPoolFactoryAbi";

// Konfigurasi database berdasarkan environment
const getDatabaseConfig = () => {
  // Connection string direct untuk write access (tanpa pooler)
  let connectionString = "postgresql://postgres.olbsisjccrlnstwzarbr:ucQKVTaBjPC9YFOX@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres";
  
  // Untuk Railway/production, pastikan gunakan direct connection
  if (process.env.NODE_ENV === "production" || process.env.RAILWAY_ENVIRONMENT ) {
    
    return {
      kind: "postgres" as const,
      connectionString: connectionString,
      schema: process.env.DATABASE_SCHEMA || "public",
      // Tambahkan konfigurasi pool untuk write access
      poolConfig: {
        max: 10,
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000,
      }
    };
  }
  
  // Default untuk development: gunakan PGlite (local)
  return {
    kind: "pglite" as const,
  };
};

export default createConfig({
  database: getDatabaseConfig(),
  chains: {
    core: {
      id: 1114,
      rpc: "https://rpc.test2.btcs.network",
    },
  },
  contracts: {
    LendingPoolFactory: {
      chain: "core",
      abi: LendingPoolFactoryAbi as any,
      address: "0x92b3f4D2312a108998a8E0fF91B90e6aB7AC97bE",
      startBlock: 7321306,
      includeTransactionReceipts: true,
    },
  },
});