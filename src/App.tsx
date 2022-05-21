import { useState } from 'react';
import SearchItem from 'components/SearchItem';
import FilterSlider from 'components/FilterSlider';
import { Box, Container, Grid } from '@mui/material';
import './App.css';

import { useQuery, gql } from '@apollo/client';

const SEARCH_HOMES_QUERY = gql`
  query SearchHomes(
    $criteria: SearchHomesCriteriaInput!
    $pagination: PaginationInput!
  ) {
    listHomes: searchHomes(criteria: $criteria, pagination: $pagination) {
      items {
        home {
          location {
            latitude
            longitude
            __typename
          }
          id
          slug
          isMyFavorite
          address {
            street1
            street2
            postcode
            city
            __typename
          }
          location {
            latitude
            longitude
            __typename
          }
          saleStatus
          sizeInM2
          lotSizeInM2
          officialPresentation {
            id
            title
            price
            pricePerM2
            description
            pictures {
              id
              url
              description
              __typename
            }
            rooms
            __typename
          }
          __typename
        }
        __typename
      }
      pagination {
        itemsPerBatch
        nextCursor
        previousCursor
        totalItems
        __typename
      }
      __typename
    }
  }
`;

function App() {
  const [priceValues, setPriceValues] = useState<
    [number | null, number | null]
  >([null, null]);

  const [sizeValues, setSizeValues] = useState<[number | null, number | null]>([
    null,
    null
  ]);

  const [baseSizeValues, setBaseSizeValues] = useState<
    [number | null, number | null]
  >([null, null]);

  const [planValues, setPlanValues] = useState<[number | null, number | null]>([
    null,
    null
  ]);

  const [roomValues, setRoomValues] = useState<[number | null, number | null]>([
    null,
    null
  ]);

  const [yearOfConstructionValues, setYearOfConstructionValues] = useState<
    [number | null, number | null]
  >([null, null]);

  const { loading, error, data } = useQuery(SEARCH_HOMES_QUERY, {
    variables: {
      criteria: {
        homeTypes: null,
        lowerPrice: priceValues[0],
        upperPrice: priceValues[1],
        lowerHomeSize: sizeValues[0],
        upperHomeSize: sizeValues[1],
        lowerLotSize: baseSizeValues[0],
        upperLotSize: baseSizeValues[1],
        lowerNumberOfFloors: planValues[0],
        upperNumberOfFloors: planValues[1],
        lowerNumberOfRooms: roomValues[0],
        upperNumberOfRooms: roomValues[1],
        lowerYearBuilt: yearOfConstructionValues[0],
        upperYearBuilt: yearOfConstructionValues[1],
        address: null,
        bounds: null,
        saleStatus: 'ACTIVE'
      },
      mapHomesPagination: {
        itemsPerBatch: 10000
      },
      pagination: {
        itemsPerBatch: 30
      }
    }
  });

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          top
        </Grid>
        <Grid container item xs={12} spacing={5}>
          <Grid item xs={12} md={6}>
            <FilterSlider
              title="Price"
              min={0}
              max={10000000}
              value={priceValues}
              onChange={(e: any) => {
                setPriceValues(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FilterSlider
              title="Size"
              min={0}
              max={300}
              value={sizeValues}
              onChange={(e: any) => {
                setSizeValues(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FilterSlider
              title="Base size"
              min={0}
              max={5000}
              value={baseSizeValues}
              onChange={(e: any) => {
                setBaseSizeValues(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FilterSlider
              title="Plan"
              min={0}
              max={3}
              value={planValues}
              onChange={(e: any) => {
                setPlanValues(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FilterSlider
              title="Room"
              min={0}
              max={5}
              value={roomValues}
              onChange={(e: any) => {
                setRoomValues(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FilterSlider
              title="Year of construction"
              min={1800}
              max={2030}
              value={yearOfConstructionValues}
              onChange={(e: any) => {
                setYearOfConstructionValues(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        {data?.listHomes && (
          <Grid container item xs={12} spacing={3}>
            {data.listHomes.items.map((item: any) => {
              return (
                <Grid key={item.home.id} item xs={12} sm={6} md={4}>
                  <SearchItem data={item.home} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default App;
