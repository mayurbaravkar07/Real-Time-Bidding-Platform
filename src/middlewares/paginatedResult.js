function paginatedResult(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;

        const results = {};

        const totalCount = await model.count();

        if (startIndex + limit < totalCount) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        try {
            results.results = await model.findMany({
                skip: startIndex,
                take: limit
            });
            res.paginatedResult = results;
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = paginatedResult;
