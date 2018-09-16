## Where's the Shuttle Bus? - [WPUshuttle.com](http://www.wpushuttle.com)

Where's the Shuttle is a web application that allows William Paterson University students track the current location of all four campus shuttle buses.
### Features

- Display currently running buses.
- Current location of buses that are running.
- Upcoming bus stops.
- Time of arrival for these bus stop.
- Shuttle buses idle bus stops for a couple of minutes. App dislays if a bus is currently idling or moving.


### Technology

![TECH](http://www.rodantnyreyes.com/images/wpshuttle/shuttle_stack.png "TECH")

This application was built with the following technology:
- ReactJs for the front end.
- Django on the Backend.
- and a PostgreSQL database to store data.

Our Reactjs auto-generates components, and consumes data from a RESTapi built with Django. Our Django backend calculates the current location of each bus using the bus location data that we stored in our database.


