import { useState, useCallback } from 'react';
import SearchItem from 'components/SearchItem';
import FilterSlider from 'components/FilterSlider';
import Loading from 'components/Loading';
import { Container, Grid } from '@mui/material';
import './App.css';

import { useQuery, gql } from '@apollo/client';
import HomeTypes, { HomeType } from 'components/HomeTypes';

const SEARCH_HOMES_QUERY = gql`
  query SearchHomes(
    $criteria: SearchHomesCriteriaInput!
    $pagination: PaginationInput!
  ) {
    listHomes: searchHomes(criteria: $criteria, pagination: $pagination) {
      items {
        home {
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

  const [homeTypeFilter, setHomeTypeFilter] = useState<HomeType[]>([]);

  const [yearOfConstructionValues, setYearOfConstructionValues] = useState<
    [number | null, number | null]
  >([null, null]);

  const [finalFilterObject, setFinalFilterObject] = useState<any>({
    lowerPrice: null,
    upperPrice: null,
    lowerHomeSize: null,
    upperHomeSize: null,
    lowerLotSize: null,
    upperLotSize: null,
    lowerNumberOfFloors: null,
    upperNumberOfFloors: null,
    lowerNumberOfRooms: null,
    upperNumberOfRooms: null,
    lowerYearBuilt: null,
    upperYearBuilt: null
  });

  const commitFilters = useCallback(() => {
    setFinalFilterObject({
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
      upperYearBuilt: yearOfConstructionValues[1]
    });
  }, [
    priceValues,
    sizeValues,
    baseSizeValues,
    planValues,
    roomValues,
    yearOfConstructionValues
  ]);

  const { loading, error, data } = useQuery(SEARCH_HOMES_QUERY, {
    variables: {
      criteria: {
        homeTypes: homeTypeFilter.length === 0 ? null : homeTypeFilter,
        address: null,
        bounds: null,
        saleStatus: 'ACTIVE',
        ...finalFilterObject
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
        <Grid item xs={12}>
          <HomeTypes onChange={setHomeTypeFilter} />
        </Grid>
        <Grid container item xs={12} spacing={5}>
          <Grid item xs={12} md={6}>
            <FilterSlider
              title="Price"
              min={0}
              max={10000000}
              value={priceValues}
              onChangeCommitted={commitFilters}
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
              onChangeCommitted={commitFilters}
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
              onChangeCommitted={commitFilters}
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
              onChangeCommitted={commitFilters}
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
              onChangeCommitted={commitFilters}
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
              onChangeCommitted={commitFilters}
              onChange={(e: any) => {
                setYearOfConstructionValues(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        {loading && <Loading />}
        {data?.listHomes && !loading && (
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
