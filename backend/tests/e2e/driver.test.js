const app = require('../../index'); 
const request = require('supertest')(app);

describe('Driver routes', () => {
  let newDriverId;

  it('should create a new driver', async () => {
    const newDriver = {
      name: 'Test Driver',
      location: 'Test Location 2',
      age: 25
    };
    const response = await request.post('/drivers').send(newDriver);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(newDriver);
    newDriverId = response.body._id; 
  });

  it('should get all drivers', async () => {
    const response = await request.get('/drivers');
    expect(response.status).toBe(200);
  });



  // Young drivers route test
it('should get young drivers', async () => {
  const response = await request.get('/drivers/young-drivers');
  expect(response.status).toBe(200);
 
});

// Single driver route test
it('should get a single driver', async () => {
  const response = await request.get(`/drivers/${newDriverId}`);
  expect(response.status).toBe(200);
 
});

// Update driver route test
it('should update a driver', async () => {
  const updatedDriver = { name: 'Updated Driver Name' }; 
  const response = await request.patch(`/drivers/${newDriverId}`).send(updatedDriver);
  expect(response.status).toBe(200);
 
});

// Find driver by name test
it('should find a driver by name', async () => {
  const driverName = 'Updated Driver Name'; 
  const response = await request.get(`/drivers/find-by-name/${driverName}`);
  expect(response.status).toBe(200);
  response.body.forEach(driver => {
    expect(driver.name).toBe(driverName);
  });
});

// Find driver by location test
it('should find drivers by location', async () => {
  const driverLocation = 'Test Location 2'; 
  const response = await request.get(`/drivers/find-by-location/${driverLocation}`);
  expect(response.status).toBe(200);
  response.body.forEach(driver => {
    expect(driver.location).toBe(driverLocation);
  });
});

it('should return 404 if driver not found', async () => {
  const invalidDriverId = '65ca5821fc586669549c1cc0'; 
  const response = await request.get(`/drivers/${invalidDriverId}`);
  expect(response.status).toBe(404);
  expect(response.text).toBe('Cannot find driver');
});

it('should delete a driver', async () => {
  const response = await request.delete(`/drivers/${newDriverId}`);
  expect(response.status).toBe(200);
});


});
