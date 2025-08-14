import { onchainTable } from "ponder";

// Factory Tables
export const LendingPoolFactory = onchainTable("LendingPoolFactory", (t) => ({
  id: t.text().primaryKey(), // factory address
  owner: t.text().notNull(),
  helper: t.text().notNull(),
  protocol: t.text().notNull(),
  isHealthy: t.text().notNull(),
  lendingPoolDeployer: t.text().notNull(),
  poolCount: t.integer().notNull().default(0),
  createdAt: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
}));

// Pool Tables
export const LendingPool = onchainTable("LendingPool", (t) => ({
  id: t.text().primaryKey(), // pool address
  factory: t.text().notNull(),
  collateralToken: t.text().notNull(),
  borrowToken: t.text().notNull(),
  ltv: t.bigint().notNull(),
  totalCollateral: t.bigint().notNull().default(0n),
  totalBorrowed: t.bigint().notNull().default(0n),
  totalLiquidity: t.bigint().notNull().default(0n),
  totalLiquidityShares: t.bigint().notNull().default(0n),
  isActive: t.boolean().notNull().default(true),
  createdAt: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
}));

// User Position Tables
export const UserPosition = onchainTable("UserPosition", (t) => ({
  id: t.text().primaryKey(), // user-pool combination
  user: t.text().notNull(),
  pool: t.text().notNull(),
  positionAddress: t.text(),
  collateralBalance: t.bigint().notNull().default(0n),
  borrowBalance: t.bigint().notNull().default(0n),
  liquidityShares: t.bigint().notNull().default(0n),
  liquidityBalance: t.bigint().notNull().default(0n),
  isActive: t.boolean().notNull().default(true),
  createdAt: t.bigint().notNull(),
  updatedAt: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
}));

// Transaction Tables
export const SupplyCollateralTransaction = onchainTable("SupplyCollateralTransaction", (t) => ({
  id: t.text().primaryKey(), // tx hash + log index
  user: t.text().notNull(),
  pool: t.text().notNull(),
  amount: t.bigint().notNull(),
  timestamp: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
  logIndex: t.integer().notNull(),
}));

export const SupplyLiquidityTransaction = onchainTable("SupplyLiquidityTransaction", (t) => ({
  id: t.text().primaryKey(),
  user: t.text().notNull(),
  pool: t.text().notNull(),
  amount: t.bigint().notNull(),
  shares: t.bigint().notNull(),
  timestamp: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
  logIndex: t.integer().notNull(),
}));

export const WithdrawLiquidityTransaction = onchainTable("WithdrawLiquidityTransaction", (t) => ({
  id: t.text().primaryKey(),
  user: t.text().notNull(),
  pool: t.text().notNull(),
  amount: t.bigint().notNull(),
  shares: t.bigint().notNull(),
  timestamp: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
  logIndex: t.integer().notNull(),
}));

export const BorrowTransaction = onchainTable("BorrowTransaction", (t) => ({
  id: t.text().primaryKey(),
  user: t.text().notNull(),
  pool: t.text().notNull(),
  amount: t.bigint().notNull(),
  shares: t.bigint().notNull(),
  chainId: t.bigint(),
  bridgeTokenSender: t.bigint(),
  timestamp: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
  logIndex: t.integer().notNull(),
}));

export const RepayTransaction = onchainTable("RepayTransaction", (t) => ({
  id: t.text().primaryKey(),
  user: t.text().notNull(),
  pool: t.text().notNull(),
  amount: t.bigint().notNull(),
  shares: t.bigint().notNull(),
  timestamp: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
  transactionHash: t.text().notNull(),
  logIndex: t.integer().notNull(),
}));

// Token Data Stream Tables
export const TokenDataStream = onchainTable("TokenDataStream", (t) => ({
  id: t.text().primaryKey(), // token address
  token: t.text().notNull(),
  dataStream: t.text().notNull(),
  isActive: t.boolean().notNull().default(true),
  createdAt: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
}));

// Basic Token Sender Tables (for cross-chain)
export const BasicTokenSender = onchainTable("BasicTokenSender", (t) => ({
  id: t.text().primaryKey(), // chainId
  chainId: t.bigint().notNull(),
  basicTokenSender: t.text().notNull(),
  isActive: t.boolean().notNull().default(true),
  createdAt: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
}));

// Analytics Tables
export const PoolDailyStats = onchainTable("PoolDailyStats", (t) => ({
  id: t.text().primaryKey(), // pool-date combination
  pool: t.text().notNull(),
  date: t.text().notNull(), // YYYY-MM-DD format
  totalCollateral: t.bigint().notNull(),
  totalBorrowed: t.bigint().notNull(),
  totalLiquidity: t.bigint().notNull(),
  totalLiquidityShares: t.bigint().notNull(),
  utilizationRate: t.real(), // borrowed / liquidity
  supplyVolume: t.bigint().notNull().default(0n),
  borrowVolume: t.bigint().notNull().default(0n),
  repayVolume: t.bigint().notNull().default(0n),
  withdrawVolume: t.bigint().notNull().default(0n),
  uniqueSuppliers: t.integer().notNull().default(0),
  uniqueBorrowers: t.integer().notNull().default(0),
  blockNumber: t.bigint().notNull(),
}));

export const UserDailyStats = onchainTable("UserDailyStats", (t) => ({
  id: t.text().primaryKey(), // user-date combination
  user: t.text().notNull(),
  date: t.text().notNull(),
  totalCollateralUSD: t.real().default(0),
  totalBorrowedUSD: t.real().default(0),
  totalLiquidityUSD: t.real().default(0),
  activePositions: t.integer().notNull().default(0),
  healthFactor: t.real(),
  blockNumber: t.bigint().notNull(),
}));
