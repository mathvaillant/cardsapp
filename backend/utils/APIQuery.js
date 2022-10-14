const _ = require('underscore');

class APIQuery {
  constructor(mongooseQuery, requestQuery) {
    this.mongooseQuery = mongooseQuery;
    this.requestQuery = requestQuery;
  }

  filter() {
    const queryObject = {...this.requestQuery};
    let queryString = JSON.stringify(_.omit(queryObject, ['page']));

    // Clean data coming from the request
    queryString = queryString.replace(/\b(gte)|gt|lte|lt\b/g, match => `$${match}`);
    
    if(_.isEmpty(JSON.parse(queryString))) return this;
    
    const regexQueryArray = _.reduce(JSON.parse(queryString), (acc, entry, key) => {
      return [
        ...acc,
        { [key]: { '$regex': entry, '$options' : 'i' } }
      ]
    }, []);

    this.mongooseQuery = this.mongooseQuery.find({ $or: regexQueryArray }); 
    
    return this;
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
