import PouchDb from 'pouchdb'
import { hashHistory } from 'react-router'
import { platform } from './lib/platforms/platform'

PouchDb.plugin(require('pouchdb-adapter-idb'));
const defaultDb = new PouchDb('localdb', {adapter: 'idb'})

const remoteDB = new PouchDb(platform.config.config().database.url)
defaultDb.sync(remoteDB)



export const setup = () => {
  return defaultDb
    .allDocs({ limit: 0 })
    .then(() => {
      return Promise.all([
        defaultDb
          .get('_design/documents')
          .catch((err) => {
            if (err.status === 404) {
              return defaultDb.put({
                _id: '_design/documents',
                version: '0.1',
                language: 'javascript',
                views: {
                  'all-docs': {
                    map: `
                      function (doc) {
                        if (doc.type === "doc") {
                          emit(doc.edited, null);
                        }
                      }
                    `
                  }
                }
              })
              .catch((err) => {
                console.log(err)
              })
            }

            return null
          }),
        defaultDb
          .get('_design/search')
          .catch((err) => {
            if (err.status === 404) {
              return defaultDb.put({
                _id: '_design/search',
                version: '0.1',
                language: 'javascript',
                views: {
                  'search': {
                    map: `
                      function (doc) {
                        if (doc.type && doc.type === "doc") {
                          var keywords = {};

                          if (doc.title) {
                            var titleSplit = doc.title.split(" ");

                            for (var i = 0; i < titleSplit.length; i++) {
                              keywords[titleSplit[i].toLowerCase()] = null;
                            }
                          }

                          if (doc.tags) {
                            for (var j = 0; j < doc.tags.length; j++) {
                              keywords[doc.tags[j]] = null;
                              emit(doc.tags[j], {
                                "search_result_type": "tag",
                                "tag": doc.tags[j]
                              });
                            }
                          }

                          for (var keyword in keywords) {
                            if (keywords.hasOwnProperty(keyword)) {
                              emit(keyword, {
                                "search_result_type": "doc",
                                "_id": doc._id,
                                "title": doc.title,
                                "synopsis": doc.synopsis,
                                "tags": doc.tags
                              });
                            }
                          }
                        }
                      }
                    `
                  }
                }
              })
              .catch((err) => {
                console.log(err)
              })
            }

            return null
          }),

        defaultDb
          .get('_design/topics')
          .catch((err) => {
            if (err.status === 404) {
              return defaultDb.put({
                _id: '_design/topics',
                version: '0.1',
                language: 'javascript',
                views: {
                  'all-topics': {
                    map: `
                      function (doc) {
                        if (doc.type === "topic") {
                          emit(doc.title, {
                            "_id": doc._id,
                            "title": doc.title,
                            "faClass": doc.faClass
                          });
                        } else if (doc.type === "doc") {
                          for (var i in doc.topics) {
                            emit(doc.topics[i], null);
                          }
                        }
                      }
                    `
                  },
                  topics: {
                    map: `
                      function (doc) {
                        if (doc.type === "topic") {
                          emit(doc.title, {
                            "_id": doc._id,
                            "title": doc.title,
                            "faClass": doc.faClass
                          });
                        }
                      }
                    `
                  },
                  'topics-docs': {
                    map: `
                      function (doc) {
                        if (doc.type === "doc") {
                          for (var i in doc.topics) {
                            emit(doc.topics[i], {
                              "_id": doc._id,
                              "title": doc.title,
                              "synopsis": doc.synopsis,
                              "tags": doc.tags
                            });
                          }
                        }
                      }
                    `
                  }
                }
              })
              .catch((err) => {
                console.log(err)
              })
            }

            return null
          }),

        defaultDb
          .get('_design/tags')
          .catch((err) => {
            if (err.status === 404) {
              return defaultDb.put({
                _id: '_design/tags',
                version: '0.1',
                language: 'javascript',
                views: {
                  'all-tags': {
                    map: `
                      function (doc) {
                        if (doc.type && doc.type === "doc" && doc.tags) {
                          for (var i = 0; i < doc.tags.length; i++) {
                            emit(doc.tags[i], {
                              "_id": doc._id,
                              "title": doc.title,
                              "synopsis": doc.synopsis,
                              "tags": doc.tags
                            });
                          }
                        }
                      }
                    `,
                    reduce: '_count'
                  }
                }
              })
              .catch((err) => {
                console.log(err)
              })
            }

            return null
          })
      ])
    })
    // .then((a) => console.log(a))
    // .then(() => console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'))
    .then(() => hashHistory.push('/documents/'))

  // PouchDb.sync('db', 'http://localhost:5984/test', {
  //   live: true,
  //   retry: true
  // })

}




export const db = defaultDb
