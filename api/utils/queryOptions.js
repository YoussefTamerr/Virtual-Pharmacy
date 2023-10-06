const queryFilter = (dbQuery, request) => {
  const filter = request.query;
  return dbQuery.find(filter);
};

export { queryFilter };
