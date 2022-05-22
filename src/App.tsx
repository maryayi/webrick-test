import { useState } from 'react';
import SearchItem from 'components/SearchItem';
import Loading from 'components/Loading';
import { Container, Grid, Typography } from '@mui/material';
import './App.css';

import { useQuery, gql } from '@apollo/client';
import HomeTypes, { HomeType } from 'components/HomeTypes';
import SearchBox from 'components/SearchBox';
import Filters from 'components/Filters';

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
  const [homeTypeFilter, setHomeTypeFilter] = useState<HomeType[]>([]);

  const [homeSearchPhrase, setHomeSearchPhrase] = useState<string>('');

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

  const { loading, error, data } = useQuery(SEARCH_HOMES_QUERY, {
    variables: {
      criteria: {
        homeTypes: homeTypeFilter.length === 0 ? null : homeTypeFilter,
        address: !!homeSearchPhrase ? homeSearchPhrase : null,
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" color="darkblue">
            WeBrick test (by Mahdi Aryayi)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SearchBox handleSearch={setHomeSearchPhrase} />
        </Grid>
        <Grid item xs={12}>
          <HomeTypes onChange={setHomeTypeFilter} />
        </Grid>
        <Grid item xs={12}>
          <Filters onChangeCommitted={setFinalFilterObject} />
        </Grid>
        {loading && <Loading />}
        {error && (
          <Grid container item xs={12} spacing={3}>
            <Typography variant="h5">Error!</Typography>
          </Grid>
        )}
        {data?.listHomes?.items?.length === 0 && !loading && (
          <Grid container item xs={12} spacing={3}>
            <Typography variant="h5">Nothing found!</Typography>
          </Grid>
        )}
        {data?.listHomes?.items?.length > 0 && !loading && (
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
