const { Client } = require('@elastic/elasticsearch')
const Bookmark = require('../models/bookmark');
const Dashboard = require('../models/dashboard')

const client = new Client({ node: process.env.ELASTICSEARCH_CONNECTION })

    async function index(bookmarkId) {
        let bookmark = await Bookmark.findById(bookmarkId).populate('category')

        const indexExists = (await client.indices.exists({ index: 'bookmarks' })).statusCode == 200

        if (!indexExists)
            await client.indices.create({ index: 'bookmarks' })

        await client.index({
            index: 'bookmarks',
            body: {
                bookmark
            }
        })
    }

    async function updateDocument(bookmarkId){
        let bookmark = await Bookmark.findById(bookmarkId).populate('category')
        await client.updateByQuery({
            index: 'bookmarks',
            body: {
                script: {
                    lang: 'painless',
                    source: 'ctx._source.bookmark=params',
                    params: bookmark

                },
                query: {
                    match: {
                        'bookmark._id': bookmarkId
                    }
                }
            }
        })
    }

    async function deleteDocument(bookmarkId) {
        await client.deleteByQuery({
            index: 'bookmarks',
            body: {
                query: {
                    match: {
                        'bookmark._id': bookmarkId
                    }
                }
            }
        })
    }

    async function search(text, userId) {
        try {
            const userDashboards = await Dashboard.find({ user: userId })
            const userDashboardList = userDashboards.map(x => x._id)
            const searchResults = await client.search({
                index: 'bookmarks',
                body: {
                    query: {
                        bool: {
                            must: [{
                                terms: { 'bookmark.dashboard': userDashboardList }
                            }],
                            minimum_should_match: 1,
                            should: [
                                {
                                    multi_match: {
                                        query: text,
                                        fields: ['bookmark.title', 'bookmark.tags', 'bookmark.description'],
                                        fuzziness: 10,
                                        operator: 'or',
                                    }
                                }, {
                                    prefix: {
                                        'bookmark.title': text
                                    }
                                }
                            ]
                        },
                    },
                }
            });

            return searchResults.body.hits.hits.map(x => x._source.bookmark)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    module.exports = {
        index, 
        updateDocument,
        deleteDocument,
        search
    }