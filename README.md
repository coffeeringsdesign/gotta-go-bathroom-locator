![Kendra Kelly Logo](/src/assets/images/kkgithub.png)

# Gotta Go - Bathroom Locator (Epicodus Capstone)
#### By _**Kendra Kelly**_
###### To view please install and enable this extension for Chrome:  [Moesif Orign & CORS Changer ](https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc?hl=en-US)

###### Then load the site:  [Gotta Go - Bathroom Locator](https://github.com/coffeeringsdesign/gotta-go-bathroom-locator)

###### Planning Repository: [Gotta Go Planning Repository](gotta-go-bathr-1544748567317.firebaseapp.com)



## Description
Gotta Go - Bathroom Locator, Epicodus Capstone project:


##### Purpose or Goal: A web application created to help fulfill the basic need of locating and accessing the nearest bathroom.

Each bathroom entry includes various information about that bathroom:

* Access Requirements: whether a key or code needed to get in the door. If a code is needed the code is supplied.
* Handicap Facilities: whether or not this particular bathroom has the needed space and facilities for handicap individuals.
* Gendered Status: whether the bathrooms are gender neutral or split by gender. This is to allow for safe and comfortable bathroom access for transgender or gender non-conforming individuals.

##### Minimum features to meet this purpose or goal:
* Uses a map API (google or other) to find the users location and displays the nearest bathrooms and a rundown of their features.
* Creating and/or connecting to a database that includes these bathroom locations and information.
* Information about bathrooms include: gender neutrality, handicap accessibility, how to access (code needed or purchase requirement).

##### Tools, frameworks, libraries, APIs, modules and/or other resources used to meet MVP:.
* Google Maps Javascript API, Googles Distance Matrix API, Googles Geocoding API.
* Custom built bathroom API on Firebase.
* React, Redux, Sass, Webpack, JavaScript.

##### Stretch goal features beyond MVP:
* A form that allows visitors to add a bathroom and it's appropriate features.
* Great design including Sass.

##### What additional tools, frameworks, libraries, APIs, or other resources will these additional features require?
* Sass
* Firebase

## User Needs/Wishes:
1.  As a user I would like to have the app automatically render bathrooms near me by my location so that I don't have to manually search.
2.  As a user I would like to be able to see a map and see the bathrooms near me visually represented for navigation purposes.
3.  I would like to know of the nearest bathroom has handicap access and room for wheelchairs.
4.  I would like to know if the bathrooms are gendered and are appropriately setup for my needs.
5.  I would like to know what I need to do to access the bathroom. Is a code needed, if so what is it?

## Initial Interface Sketches:
| Splash Page | Search Interface |
| --------- | --------------|
| ![Splash Page Mockup](/src/assets/images/mockup-splash-interface.jpeg) | ![Search Page Mockup](/src/assets/images/mockup-search-interface.jpeg) |

## Component Tree:
![Component Tree Layout](/src/assets/images/component-tree.png)

## Main Page High Res Wireframe
| Main Page Wireframe | Main Page Final Screenshot |
| --------- | --------------|
| ![Main Page Wireframe](/src/assets/images/gotta-go-wireframe-main-page.png) | ![Main Page Final Screenshot](/src/assets/images/main-page-screenshot.png) |

## Detail Page High Res Wireframe
| Detail Page Wireframe | Detail Page Final Screenshot |
| --------- | --------------|
| ![Detail Page Wireframe](/src/assets/images/gotta-go-wireframe-detail-page.png) | ![Detail Page Final Screenshot](/src/assets/images/detail-page-screenshot.png) |

## Add Bathroom Form Page Screenshot
![Add Bathroom Form Page Screenshot](/src/assets/images/add-bathroom-form-page-screenshot.png)

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

## Technologies Used

* Javascript, JSX, Sketch, Sass, React, Redux, Atom,
* google-map-react: https://www.npmjs.com/package/google-map-react - a React component to help use the Google Maps Javascript API to display a map, center it around the users location, and display the bathrooms locations nearby.
* google-distance-matrix: https://www.npmjs.com/package/google-distance-matrix - a React module to help use the Google Distance Matrix API to determine the bathrooms distance from the user location.
* react-geocode: https://www.npmjs.com/package/react-geocode - a React module to help use the Google Maps Geocoding API to grab longitude & latitude for an address when a user submits a new bathroom.

## Support and contact details

Please feel free to get in touch. Reach out to me at kendra@coffeeringsdesign.com.

## Documentation Used:
* This tutorial was really helpful: https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
* Google Map APIs docs are pretty good but not necessarily helpful with react: https://developers.google.com/maps/documentation/javascript/tutorial. I would recommend searching for your question + React to find a more specific answer.

### License
*MIT*

Copyright (c) 2018 **Kendra Kelly**
