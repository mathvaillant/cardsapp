class APIQuery {
  constructor(mongooseQuery, requestQuery) {
    this.mongooseQuery = mongooseQuery;
    this.requestQuery = requestQuery;
  }

  paginate() {
    const page = Math.abs(parseInt(this.requestQuery.page)) || 1;
    const limit = 10;
    const skip = (page - 1) * limit; 
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIQuery;
