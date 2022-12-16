const ints = (x) => x.match(/(-?\d)+/g).map(Number);

const memoize = (func, resolver) => {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError('Expected a function');
    }
    const memoized = function () {
        const args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
    };
    memoized.cache = new Map();
    return memoized;
}


module.exports = {
    ints,
    memoize
};
