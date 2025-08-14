import { ponder } from "ponder:registry";
import * as schema from "../ponder.schema";
import { LendingPoolAbi } from "../abis/LendingPoolAbi";

// Storage untuk tracking pool addresses yang dibuat
const trackedPools = new Set<string>();

// TokenDataStreamAdded Event Handler
ponder.on("LendingPoolFactory:TokenDataStreamAdded" as any, async ({ event, context }: any) => {
  console.log("TokenDataStream added:", event.args);

  await context.db.insert(schema.TokenDataStream).values({
    id: `${event.args.token}-${event.args.dataStream}`,
    token: event.args.token,
    dataStream: event.args.dataStream,
    isActive: true,
    createdAt: event.block.timestamp,
    blockNumber: event.block.number,
  });

  console.log("✅ TokenDataStream saved to database!");
});

// BasicTokenSenderAdded Event Handler
ponder.on("LendingPoolFactory:BasicTokenSenderAdded" as any, async ({ event, context }: any) => {
  console.log("BasicTokenSender added:", event.args);

  await context.db.insert(schema.BasicTokenSender).values({
    id: `${event.args.chainId}`,
    chainId: BigInt(event.args.chainId),
    basicTokenSender: event.args.basicTokenSender,
    isActive: true,
    createdAt: event.block.timestamp,
    blockNumber: event.block.number,
  });

  console.log("✅ BasicTokenSender saved to database!");
});

// LendingPoolCreated Event Handler  
ponder.on("LendingPoolFactory:LendingPoolCreated" as any, async ({ event, context }: any) => {
  console.log("LendingPool created:", event.args);
  
  const poolAddress = event.args.lendingPool;

  // Simpan info lending pool baru dengan semua field yang required
  await context.db.insert(schema.LendingPool).values({
    id: poolAddress,
    factory: event.log.address, // factory address dari event log
    collateralToken: event.args.collateralToken,
    borrowToken: event.args.borrowToken,
    ltv: BigInt(event.args.ltv),
    totalCollateral: 0n,
    totalBorrowed: 0n,
    totalLiquidity: 0n,
    totalLiquidityShares: 0n,
    isActive: true,
    createdAt: BigInt(event.block.timestamp),
    blockNumber: BigInt(event.block.number),
  });

  // Track pool address untuk monitoring manual
  trackedPools.add(poolAddress);
  
  console.log(`✅ New LendingPool ${poolAddress} saved to database!`);
  console.log(`📊 Pool details - Collateral: ${event.args.collateralToken}, Borrow: ${event.args.borrowToken}, LTV: ${event.args.ltv}`);
  console.log(`📊 Total tracked pools: ${trackedPools.size}`);
});
