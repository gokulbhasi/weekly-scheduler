Manual / Automatic Scheduler in ReactJS
Produce a single page ReactJS app to assist in scheduling. Single page app should look like the
following.

Schedule

-------------------Monday--Tuesday--Wednesday---Thursday--Friday

Morning-UpStairs------X-------X---------X-----------X-------X

Morning-Down-Stairs---X-------X---------X-----------X-------X

Morning-Parking-Lot---X-------X---------X-----------X-------X

Lunch A---------------X-------X---------X-----------X-------X

Lunch B---------------X-------X---------X-----------X-------X

Lunch C---------------X-------X---------X-----------X-------X

Lunch D---------------X-------X---------X-----------X-------X

Afternoon-Up-Stairs---X-------X---------X-----------X-------X

Afternoon-Down-Stairs-X-------X---------X-----------X-------X

Afternoon-Parking-Lot-X-------X---------X-----------X-------X


Load

Staff Member - Monday - Tuesday-Wednesday-Thursday-Friday-Totals

-----X1----------Y--------Y--------Y---------Y-------Y-------YY

-----X2----------Y--------Y--------Y---------Y-------Y-------YY

-----X3----------Y--------Y--------Y---------Y-------Y-------YY

-----X4----------Y--------Y--------Y---------Y-------Y-------YY

-----X5----------Y--------Y--------Y---------Y-------Y-------YY

-----X6----------Y--------Y--------Y---------Y-------Y-------YY
    
    
For the Schedule section, fields labelled X allow display and selection of a staff member for a
time slot / shift
There are seven staff members, their names are X1, X2, X3, X4, X5, X6 and X7.
In the Load section, each staff member is listed (X1..X7). Fields labelled Y are that staff
members’ ‘load’ for that day. Their load is the number of shifts worked on that day. Fields
labelled YY are the total number of shifts allocated to staff member in the week.
Quality of code, documentation, tests and functionality are what ISARA is interested in seeing.
ISARA appreciates that your personal time is valuable – please do not spend more than 2 hours
total working on this challenge. The following table describes features breaking this single page

app into functional blocks. Not all levels need to be addressed. Addressed levels should be
attempted in numerical order though.

Level Features
1 Self contained .zip file, or link to github code repository containing Javascript and
package configuration files to start an ExpressJS server, which serves no content
2 Server serves a ReactJS page which is static, but similar in shape to the above.
Components are preferred a single render function building everything.
3 ReactJS page where each X above is replaced with some HTML control allowing a staff
member to be selected for a slot.
4 ReactJS page displays all staff in the Load section, with their number of slots correct
for each day, and the correct total for the week
5 ReactJS page prevents – or displays warning – when a staff member is in consecutive
lunch slots on the same day.
6 ReactJS page prevents – or displays warning – when a staff member has more than 2
shifts per day
7 ReactJS page prevents – or displays warning – when a staff member has more than 7
shifts per week
8 ReactJS page prevents – or displays warning – when a staff member is selected to be
in two places at once. (eg: UpStairs and Parking Lot)
9 ReactJS page allows randomised population of currently empty shifts, respecting the
above rules. At this level, clearing all shifts should be supported too.
10 ReactJS page reports how many staff members are needed to fill all shifts, respecting
the above rules.
11 ReactJS page stores current progress at the server (globally)
12 ReactJS page can retrieve current state when re-opened (globally)
13 ReactJS page supports undo/redo

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
