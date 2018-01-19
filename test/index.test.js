const assert = require('assert');

const Pif = require('../index');


describe('test to promise if-else', () => {
    it('should catch the promise in if flow', (done) => {
        new Pif((resolve) => resolve())
            .then(() => {
                console.log('1');
                Pif.if(false);
                console.log('despues de llamar el if');
            })
            .then(done)
            .then(done)
            .then(() => {
                console.log('4');
                Pif.end();
            })
            .then(done);
    });

    it('should catch the promise in if flow', (done) => {
        new Pif((resolve) => resolve())
            .then(() => {
                console.log('1');
                Pif.if(false);
                console.log('despues de llamar el if');
                return Promise.reject('error');
            })
            .catch(done)
            .catch(done)
            .then(done)
            .then(() => {
                console.log('4');
                Pif.end();
            })
            .catch((error) => {
                assert(error === 'error');
                done();
            });
    });
});
