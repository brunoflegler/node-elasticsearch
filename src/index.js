const { Client } = require('elasticsearch')

const client = new Client({
  host: `localhost:9201`,
  apiVersion: '1.7',
})

async function run () {
  // Let's start by indexing some data
  // await client.index({
  //   index: 'pagarme_2021_03',
  //   type: 'transaction',
  //   id: 5,
  //   body: {
  //    id: 5
  //   }
  // })

  // await client.delete({
  //   index: 'pagarme_2021_03',
  //   type: 'transaction',
  //   id: 5
  // })

  await client.indices.putTemplate({
    name: 'pagarme1',
    body: {
      template: 'pagarme1*',
      aliases: {
        pagarme: {},
      },
    },
  })

  await client.index({
    index: 'pagarme1_2021_03',
    type: 'transaction',
    refresh: true,
    id: 5,
    body: {
     id: 5
    }
  })

  const result = await client.search({
    index: 'pagarme1_2021_03',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { id: 10 }
      }
    }
  })

  console.log(result.hits.hits[0]._source)
}

run().catch(console.log)

