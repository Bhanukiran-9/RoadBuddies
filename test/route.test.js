// test/app.test.js
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
chai.use(chaiHttp);
const expect = chai.expect;
describe('POST /filter', () => {
    it('responds with status 200 and JSON data', (done) => {
        chai.request(app)
            .post('/rides/filter')
            .send({from: 'vskp',to: 'mdp', date:'2024-02-18'})
            .then((res) => {
                if (err) return done(err);
                // You can further assert the JSON response here if needed
                // For example:
                
                expect(res).to.have.status(200);
                const expectedRide = [{
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
                    __v: 0,
                    _id: '65cdd0642e5ae896c943ddb9'
                }];

                expect(res.body).to.deep.equal(expectedRide);
                
                done();
            }).catch((err) => {
                return done()
            })
    });
    it('responds with status 200 and JSON data and is create function', (done) => {
        chai.request(app)
            .post('/rides/create')
            .send({from: 'vskp',to: 'mdp', date:'2024-02-18'})
            .then((res) => {
                if (err) return done(err);

                const data = {
                    departure: 'vskp',
                    destination: 'gwk',
                    seatsAvailable: '4',
                    date: '2024-02-22',
                    time: '04:47',
                    price: '200'
                  };
                expect.apply(res).to.have.status(200);
                expect(res.body).to.have.equal({message :"Successfully inserted."});

                done();
            })
            .catch(() => {
                return done()
            })
        })
});
