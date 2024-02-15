// test/app.test.js
const request = require('supertest');
const router = require('../routes/rides');

describe('POST /filter', () => {
    it('responds with status 200 and JSON data', (done) => {
        request(router)
            .post('/filter')
            .send({from: 'vskp',to: 'mdp', date:'2024-02-18'})
            .set('Accept', 'applicaton/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // You can further assert the JSON response here if needed
                // For example:
                // assert.equal(res.body.message, 'Data retrieved successfully');

                const expectedRide = {
                    driver: {
                        _id: '65cce0826c1429e7735a4597',
                        username: 'Bhanu Kiran'
                    },
                    _id: '65cdd0642e5ae896c943ddb9',
                    departure: 'vskp',
                    destination: 'mdp',
                    seatsAvailable: 4,
                    date: '2024-02-18T00:00:00.000Z',
                    time: '18:20',
                    isActive: true,
                    driverRating: 0,
                    requests: [],
                    riderRatings: [],
                    __v: 0
                };

                expect(res.body).to.deep.include(expectedRide);
                
                done();
            });
    });
});
