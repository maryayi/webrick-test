import { useState, useCallback, useEffect } from 'react';
import { Grid, Button } from '@mui/material';

type Props = {
  onChange: (value: HomeType[]) => void;
};

export type HomeType =
  | 'APARTMENT'
  | 'FARMHOUSE'
  | 'OTHER'
  | 'ONEFAMILY'
  | 'MULTIFAMILY'
  | 'ROW';

const HomeTypes = ({ onChange }: Props) => {
  const [homeType, setHomeType] = useState<Set<HomeType>>(new Set([]));

  const handleChange = useCallback(
    (currentHomeType: HomeType) => {
      if (homeType.has(currentHomeType)) {
        setHomeType(
          (prev: Set<HomeType>) =>
            new Set([...prev].filter((x) => x !== currentHomeType))
        );
      } else {
        setHomeType(
          (prev: Set<HomeType>) => new Set([...prev, currentHomeType])
        );
      }
    },
    [homeType]
  );

  useEffect(() => {
    onChange(Array.from(homeType));
  }, [homeType]);

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Button
          onClick={() => setHomeType(new Set([]))}
          variant={homeType.size === 0 ? 'contained' : 'outlined'}
        >
          All
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => handleChange('ONEFAMILY')}
          variant={homeType.has('ONEFAMILY') ? 'contained' : 'outlined'}
        >
          Villa
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => handleChange('MULTIFAMILY')}
          variant={homeType.has('MULTIFAMILY') ? 'contained' : 'outlined'}
        >
          Villa apartment
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => handleChange('APARTMENT')}
          variant={homeType.has('APARTMENT') ? 'contained' : 'outlined'}
        >
          Apartment
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => handleChange('ROW')}
          variant={homeType.has('ROW') ? 'contained' : 'outlined'}
        >
          Terraced house
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => handleChange('FARMHOUSE')}
          variant={homeType.has('FARMHOUSE') ? 'contained' : 'outlined'}
        >
          Country house
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => handleChange('OTHER')}
          variant={homeType.has('OTHER') ? 'contained' : 'outlined'}
        >
          Other
        </Button>
      </Grid>
    </Grid>
  );
};

export default HomeTypes;
