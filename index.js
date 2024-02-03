const colors = require('colors')


const Passenger = require('./passenger')
const Driver = require('./driver')

const passengerDatabase = require('./passenger-database')
const driverDatabase = require('./driver-database')

const armagan = new Passenger('Armagan', 'Kreuzberg')
const mert = new Passenger('Mert', 'Mitte')
const stefan = new Driver('Stefan', 'Treptower Park')

armagan.book(stefan, 'Kreuzberg', 'Neukolln')
armagan.book(stefan, 'Neukolln', 'Mitte')
armagan.book(stefan, 'Mitte', 'Kreuzberg')
armagan.book(stefan, 'Kreuzberg', 'SXF')
mert.book(mert, 'Kreuzberg', 'SXF')

function printBooking(booking) {
  console.log(`${colors.blue(booking.passenger.name)} booked ${colors.blue(booking.driver.name)} to travel from ${colors.bgRed.white(booking.origin)} to ${colors.bgRed.white(booking.destination)}`)
}

function printBookingHistory(passenger) {
  if(passenger.bookings.length == 0){
    console.log(`${colors.blue(passenger.name)} has no bookings`)
  }
  passenger.bookings.forEach(printBooking);
}

// db.save('passenger', [{name: 'Armagan', location: 'Berlin'}])
// db.save('passengers', [armagan, mert])
// db.save('drivers', [stefan])
passengerDatabase.save([armagan, mert]);

driverDatabase.save([stefan]);

// console.log(armagan.bookings[0])
// db.save('passenger', [armagan])
// db.save('driver', [stefan])
// const passengers = db.load('passengers')
// passengers.forEach(printBookingHistory)
// const betul = new Passenger('betul', 'Tegel');
// db.insert('passengers', betul);
// db.remove('passengers', 3); // remove by index

const armagan2 = passengerDatabase.findByName('Mert');
// armagan.book(stefan, 'SXF', 'TXL');

armagan2.book(stefan, 'Mitte', 'SXF');
printBookingHistory(armagan2);
// const passengers = db.load('passengers');
// passengers.forEach(p => console.log(p.name));


// printBookingHistory(armagan)


//const armagan2 = passengers[0]; // we can not get passenger object