let ifCondition = false;
let ifCalled = false;

module.exports = class {
    constructor(handler) {
        this.promise = new Promise(handler);
    }

    static if(condition) {
        console.log('llamando el if');
        if (condition) ifCondition = condition;
        ifCalled = true;
    }

    static end() {
        console.log('llamando el end');
        ifCondition = false;
        ifCalled = false;
    }

    then(resolve, reject) {
        this.promise = this.promise.then((value) => {
            console.log('is en then', ifCondition || !ifCalled || resolve.toString().search(/.*\.end()/) >= 0);
            if (ifCondition || !ifCalled || resolve.toString().search(/.*\.end()/) >= 0) return resolve(value);
            return value;
        }, (error) => {
            console.log('is en catch', ifCondition || !ifCalled || resolve.toString().search(/.*\.end()/) >= 0 || Boolean(reject) && reject.toString().search(/.*\.end()/) >= 0);
            console.log('reject ', reject);
            console.log('resolve ', resolve);
            const isInsideOfIf = ifCondition || !ifCalled || resolve.toString().search(/.*\.end()/) >= 0 || reject && reject.toString().search(/.*\.end()/) >= 0;
            if (isInsideOfIf) return reject ? reject(error) : Promise.reject(error, resolve());
            return Promise.reject(error);
        });
        return this;
    }

    catch(reject) {
        this.promise = this.promise.catch((error) => {
            console.log('is en catch alone', ifCondition || !ifCalled || reject.toString().search(/.*\.end()/) >= 0);
            console.log('reject ', reject);

            if (ifCondition || !ifCalled || reject.toString().search(/.*\.end()/) >= 0) return reject(error);
            return Promise.reject(error);
        });
        return this;
    }
};
