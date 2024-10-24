# Blab Board

[Live Website](https://blab-board.netlify.app)

Front End for Blab Board messaging app. The [Back End repository](https://github.com/DrantDumani/Blab-board-api) can be found here.

## Tech Stack

- React Router
- CSS Modules
- Vitest
- Socket.io

This app allows people users to create and customize accounts and chat boards. It also allows people to upload images to chats and send friend requests.

Built with a test driven development methodology. Tests were written first, and the components were written in order to pass the tests. Third party features were mocked when possible, such as react router's loaders. `window.scrollTo` does not work in jsdom, so that was mocked as well.

React Routers loaders were used when fetching data to prevent render based fetching. Actions were used to revalidate data on some routes, but the board route uses socket.io for live chat and member updates.
