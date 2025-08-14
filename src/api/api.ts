// File ini tidak diperlukan karena GraphQL sudah dihandle di index.ts
// Ponder secara otomatis menyediakan GraphQL endpoint

// Hapus file ini atau gunakan sebagai dokumentasi query GraphQL

/* 
CONTOH GRAPHQL QUERIES YANG BISA DIGUNAKAN:

1. Get All Lending Pools:
query GetLendingPools {
  lendingPools {
    items {
      id
      factory
      collateralToken
      borrowToken
      ltv
      totalCollateral
      totalBorrowed
      totalLiquidity
      totalLiquidityShares
      isActive
      createdAt
      blockNumber
    }
  }
}

2. Get Specific Pool by Address:
query GetPool($id: String!) {
  lendingPool(id: $id) {
    id
    factory
    collateralToken
    borrowToken
    ltv
    totalCollateral
    totalBorrowed
    totalLiquidity
    totalLiquidityShares
    isActive
    createdAt
  }
}

3. Get User Positions:
query GetUserPositions($user: String!) {
  userPositions(where: { user: $user, isActive: true }) {
    items {
      id
      user
      pool
      collateralAmount
      borrowedAmount
      liquidityShares
      isActive
      createdAt
      updatedAt
    }
  }
}

4. Get Token Data Streams:
query GetTokenDataStreams {
  tokenDataStreams {
    items {
      id
      token
      dataStream
      isActive
      createdAt
      blockNumber
    }
  }
}

5. Get Factory Information:
query GetFactories {
  lendingPoolFactories {
    items {
      id
      isActive
      createdAt
      blockNumber
    }
  }
}

Endpoint: http://localhost:42069/graphql
*/
