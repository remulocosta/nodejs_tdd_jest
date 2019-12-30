const request = require('supertest');

const app = require('../../src/app');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Autentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await User.create({
      name: 'Remulo',
      email: 'remulo.costa@gmail.com',
      password: '123456'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await User.create({
      name: 'Remulo',
      email: 'remulo.costa@gmail.com',
      password: '123123'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when credentials', async () => {
    const user = await User.create({
      name: 'Remulo',
      email: 'remulo.costa@gmail.com',
      password: '123123'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      });

    expect(response.body).toProperty('token');
  });


});




// it('should sum two numbers', async () => {
//   const user = await User.create({
//     name: 'Remulo',
//     email: 'remulo.costa@gmail.com',
//     password_hash: '123123'
//  });

//  console.log(user);

//   expect(user.email).toBe('remulo.costa@gmail.com');
// });
