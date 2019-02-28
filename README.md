![Kendra Kelly Logo](/src/assets/images/kkgithub.png)

# Gotta Go - Bathroom Locator
###### Planning Repository: [Gotta Go Planning Repository](https://github.com/coffeeringsdesign/gotta-go-bathroom-locator)

#### By _**Kendra Kelly**_

## Project Description
Gotta Go - Bathroom Locator, my Epicodus Capstone project:

##### Name of Student:
Kendra Kelly

##### Name of Project:
Gotta Go

##### Project’s Purpose or Goal:
Bathroom finder by location. Focused on the needs of the person.

##### List the absolute minimum features the project requires to meet this purpose or goal:
* Uses a map API (google or other) to find the users location and displays the nearest bathrooms and a rundown of their features.
* Creating and/or connecting to a database that includes these bathroom locations and information.
* Information about bathrooms include: gender neutrality, handicap accessibility, how to access (code needed or purchase requirement).

##### What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is specific to your track, and your language) will you use to create this MVP? List them all here. Be specific.
* Google Maps, Mapbox or another Map API.
* Refuge Restrooms API, or possibly build one from scratch if needed.
* React, Redux, Sass, Webpack, JavaScript.

##### If you finish developing the minimum viable product (MVP) with time to spare, what will you work on next? Describe these features here: Be specific.
* A form that allows visitors to add a bathroom and it's appropriate features.
* Add more information about the bathroom within the database. This includes information about stalls, cleanliness, size, etc.
* Great design including Sass.

##### What additional tools, frameworks, libraries, APIs, or other resources will these additional features require?
* Sass
* Firebase

## User Needs/Wishes:
1.  As a user I would like to enter a location and be able to see a list of bathrooms located near me for easy access.
2.  As a user I would like to have the app automatically render bathrooms near me by my location so that I don't have to manually search.
3.  As a user I would like to be able to see a map and see the bathrooms near me visually represented for navigation purposes.
4.  I would like to know of the nearest bathroom has handicap access and room for wheelchairs.
5.  I would like to know if the bathrooms are gendered and are appropriately setup for my needs.
6. I would like to know what I need to do to access the bathroom. Is a code needed, if so what is it? Do I need to make a purchase prior to access?

## Initial Interface Sketches:
| Splash Page | Search Interface |
| --------- | --------------|
| ![Splash Page Mockup](/src/assets/images/mockup-splash-interface.jpeg) | ![Search Page Mockup](/src/assets/images/mockup-search-interface.jpeg) |

## Component Tree:
![Component Tree Layout](/src/assets/images/GottaGoComponentTree.png)

## Splash Page High Res Wireframe
![Splash Page Mockup](/src/assets/images/mockup-splash-page.png)

## Search Page High Res Wireframe
![Search Page Mockup](/src/assets/images/mockup-search-page.png)

## Detail Page High Res Wireframe
![Search Page Mockup](/src/assets/images/mockup-search-detail-page.png)

## Setup/Installation Requirements
Using Command Line:
1. ``git clone https://github.com/coffeeringsdesign/gotta-go-bathroom-locator.git `` to clone the site.
2. ``cd ~`` to navigate to base directory
3. ``cd Desktop `` to navigate to your desktop
4. ``cd gotta-go-bathroom-locator`` to enter the site folder
5.  You will need to get an API key from Google Maps in order to access Google Maps. https://developers.google.com/maps/documentation/javascript/tutorial
6.  Place it within this text: ``REACT_APP_API_KEY=PLACE_YOUR_KEY_HERE`` in a file called .env inside the main directory
7.  Place ``.env`` in the .gitignore file.
8. ``npm install`` to install all webpack dependencies
9. ``npm run start`` this will webpack and immediate pop open the site on your browser. I recommend Chrome.
10. I recommend Atom to edit any html, javascript, or sass.

## Support and contact details

Please feel free to get in touch. Reach out to me at kendra@coffeeringsdesign.com.

## Technologies Used

Javascript, JSX, Sketch, Sass, React, Redux, Atom,
google-map-react: https://www.npmjs.com/package/google-map-react - a React component to help use the Google Maps Javascript API to display a map, center it around the users location, and display the bathrooms locations nearby.
google-distance-matrix: https://www.npmjs.com/package/google-distance-matrix - a React module to help use the Google Distance Matrix API to determine the bathrooms distance from the user location.
react-geocode: https://www.npmjs.com/package/react-geocode - a React module to help use the Google Maps Geocoding API to grab longitude & latitude for an address when a user submits a new bathroom.

## Documentation Used:
This tutorial was really helpful: https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
Google Map APIs docs are pretty good but not necessarily helpful with react: https://developers.google.com/maps/documentation/javascript/tutorial
I would recommend searching for your question + React to find a more specific answer.

### License

*MIT*

Copyright (c) 2018 **Kendra Kelly**
