export function buildUserQuery(userId: string): Record<string, any> {
  return {
    $and: [
      {
        owner: userId
      },
      {
        owner: {
          $exists: true
        }
      }
    ]
  };
}

export function buildItemQuery(userId: string, itemId: string): Record<string, any> {
  return {
    $and: [
      {
        _id: itemId
      },
      buildUserQuery(userId)
    ]
  };
}
