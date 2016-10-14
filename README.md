# HS7
A simple and extensible notes editor. This project as now is still a pre-pre-alpha.

## Requirements
* A CouchDB instance with an empty database is required. Database url is configurable in `config/config.json`
* node.js >= 5.11.1
* electron >= 1.4.1
* gulp cli >= 3.9.0

## Setup & startup
* Install node modules: `npm install`
* Build for electron: `gulp electron-build`
* Make sure CouchDB is running.
* `electron electron.js`

## License
HS7 is [GPL-3 licensed](LICENSE).
