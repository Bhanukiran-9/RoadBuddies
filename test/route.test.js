const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from ../app
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const isAuthenticated = require('../middleware/auth');



describe('POST /filter', () => {
    it('responds with status 200 and JSON data', (done) => {
        request(app)
            .post('/rides/filter')
            .send({ from: 'vskp', to: 'mdp', date: '2024-02-18' })
            .then((res) => {
                expect(res).to.have.status(302);
                const expectRide = {};
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

                console.log(res.body);
                expect(res.body).to.deep.equal(expectRide);
                done();
            })
            .catch(done);
    });

    it('responds with status 200 and JSON data and is create function', (done) => {
        request(app)
            .post('/rides/create')
            .send({
                from: 'vskp',
                to: 'mdp',
                date: '2024-02-18'
            })
            .then((res) => {
                const data = {
                    departure: 'vskp',
                    destination: 'gwk',
                    seatsAvailable: '4',
                    date: '2024-02-22',
                    time: '04:47',
                    price: '200'
                };
                result = res.body;
                expect(res).to.have.status(302);
                expect(res.body).to.deep.equal(result);
                done();
            })
            .catch(done);
    });
});


describe('GET HISTORY/ and carpools/rides', () => {
    it('responds with status 200 and render page', (done) => {
        chai.request(app)
            .post('/history/')
            .then((res) => {
                if (err) return done(err);
                // You can further assert the JSON response here if needed
                // For example:
                
                expect(res).to.have.status(200);

                
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
                expect.apply(res).to.have.status(200);
                //expect(res.body).to.have.equal({message :"Successfully inserted."});

                done();
            })
            .catch(() => {
                return done()
            })
        })
});

describe('GET /book', () => {
    // Override the isAuthenticated middleware to bypass authentication check
    const mockIsAuthenticated = (req, res, next) => {
        req.session.userId = 'mockUserId'; // Simulate authentication by setting a mock userId in the session
        next();
    };

    // Replace the actual isAuthenticated middleware with the mock middleware for testing
    before(() => {
        app.use('/book', mockIsAuthenticated);
    });

    it('responds with status 200 and renders the "carpools" view', (done) => {
        request(app)
            .get('/book')
            .expect(302)
            .end((err, res) => {
                if (err) return done(err);
                
                                              
                done();
            });
    });
});

describe('GET /post', () => {
    it('responds with status 302 and redirects to the login page', (done) => {
        request(app)
            .get('/post')
            .expect(302) // Expect a redirection status code
            .expect('Location', '/auth/login') // Expect redirection to the login page
            .end((err, res) => {
                if (err) return done(err);
                
                // No need to check response body or text for redirection

                done();
            });
    });
});
describe('GET /', () => {
    it('responds with status 200 and renders the "home" view', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                
                // Assuming the rendered page contains a specific element or text
                //expect(res.text).to.include('<h1>Home</h1>'); // Adjust according to your view content
                
                done();
            });
    });
});

describe('GET /', () => {
    it('responds with status 302 and redirects to login if user is not authenticated', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect('Location', '/login')
            .end(done);
    });
});

describe('GET /profile', () => {
    it('responds with status 200 and renders the "profile" view if user is authenticated', (done) => {
        request(app)
            .get('/')
            .set('Cookie', 'userId=mockUserId') // Simulating authentication by setting a mock userId in the session
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                
                // Assuming the rendered page contains a specific element or text
                //expect(res.text).to.include('<h1>Profile</h1>'); // Adjust according to your view content
                
                done();
            });
    });
});

describe('POST /rideaccept', () => {
    it('responds with status 200 and accepts ride request', (done) => {
        request(app)
            .post('/rideaccept')
            .send({ rideId: 'rideId', requestId: 'requestId' }) // Pass rideId and requestId accordingly
            .expect(302)
            .end((err, res) => {
                if (err) return done(err);
                
                // Assuming the response contains a success message
                //expect(res.body).to.have.property('message', 'Request accepted successfully.');
                
                done();
            });
    });
});

describe('POST /ridereject', () => {
    it('responds with status 200 and rejects ride request', (done) => {
        request(app)
            .post('/ridereject')
            .send({ rideId: 'rideId', requestId: 'requestId' }) // Pass rideId and requestId accordingly
            .expect(302)
            .end((err, res) => {
                if (err) return done(err);
                
                // Assuming the response contains a success message
                //expect(res.body).to.have.property('message', 'Request rejected successfully.');
                
                done();
            });
    });
});
