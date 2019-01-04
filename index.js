const express = require('express')
const axios = require('axios')
const app = express()

app.get('/api/v1/tokopedia/:product',(req,res)=>{
    console.log(req.params)
    axios.default.post('https://gql.tokopedia.com/', [{
        "operationName": "SearchProduct", "variables": { "q": req.params.product, "start": 0, "rows": 50, "uniqueId": "6bb61e3b7bce0931da574d19d1d82c88", "filter": {}, "ob": "23" }, "query": "query SearchProduct($q: String, $start: Int, $rows: Int, $ob: Int, $uniqueId: String, $filter: SearchProductFilterInput)" + `{  searchProduct(q: $q, start: $start, rows: $rows, ob: $ob, filter: $filter, uniqueId: $uniqueId) {
        query
        source
        shareUrl
        isFilter
        count
        redirection {
          redirectUrl
          departmentId
          __typename
        }
        suggestion {
          currentKeyword
          suggestion
          suggestionCount
          instead
          insteadCount
          text
          query
          __typename
        }
        products {
          id
          name
          childs
          url
          imageUrl
          imageUrlLarge
          price
          rating
          countReview
          preorder
          cashback
          wishlist
          gaKey
          catId
          shop {
            id
            name
            url
            location
            city
            reputation
            clover
            goldmerchant
            official
            __typename
          }
          __typename
        }
        catalogs {
          id
          name
          price
          rawPrice
          minPrice
          maxPrice
          rawMinPrice
          rawMaxPrice
          count
          description
          imageUrl
          url
          departmentId
          __typename
        }
        __typename
      }
    }`}])
    .then(function(result){
        res.send({
            result:result.data
        })
    })
    .catch(function(err){
        res.send({
            error:err
        })
    })
})
app.listen(1234)