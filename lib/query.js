export const PRODUCT_QUERY = `query{
  products{
    data{
      attributes{
        Description
        Title
        Slug
        Price
        Image{
          data{
            attributes{
            formats
            }
          }
        }
      }
    }
  }
}
`;

export const GET_PRODUCT_QUERY = `
query getProducts($slug:String!){
  products(filters: {Slug :{eq: $slug}}){
    data{
      attributes{
        Title
        Slug
        Description
        Price
        Image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}`;
