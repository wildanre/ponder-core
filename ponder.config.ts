import { createConfig } from "ponder";

import { LendingPoolAbi } from "./abis/LendingPoolAbi";
import { LendingPoolFactoryAbi } from "./abis/LendingPoolFactoryAbi";

// Konfigurasi database berdasarkan environment
const getDatabaseConfig = () => {
  // Jika NODE_ENV=production atau ada DATABASE_URL, gunakan PostgreSQL
  if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
    return {
      kind: "postgres" as const,
      connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_BV08OFhmSUgk@ep-withered-snow-a1ceu92e.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
      schema: process.env.DATABASE_SCHEMA || "public",
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
