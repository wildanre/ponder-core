import { createConfig } from "ponder";

import { LendingPoolAbi } from "./abis/LendingPoolAbi";
import { LendingPoolFactoryAbi } from "./abis/LendingPoolFactoryAbi";

// Konfigurasi database berdasarkan environment
const getDatabaseConfig = () => {
  // Connection string direct untuk write access (tanpa pooler)
  const directConnectionString = "postgresql://neondb_owner:npg_BV08OFhmSUgk@ep-withered-snow-a1ceu92e.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
  
  // Untuk Railway/production, pastikan gunakan direct connection
  if (process.env.NODE_ENV === "production" || process.env.RAILWAY_ENVIRONMENT || process.env.DATABASE_URL) {
    let connectionString = process.env.DATABASE_URL || directConnectionString;
    
    // Pastikan tidak menggunakan pooler untuk write operations
    connectionString = connectionString.replace('-pooler', '');
    
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
