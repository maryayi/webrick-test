import { KeyboardEvent, ChangeEvent, useState } from 'react';
import { Grid, IconButton, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  handleSearch: (value: string) => void;
};

const SearchBox = ({ handleSearch }: Props) => {
  const [searchValue, setSearchValues] = useState<string>('');
  return (
    <Grid container>
      <Grid item xs={10}>
        <Input
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              handleSearch(searchValue);
            }
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchValues(e.target.value);
          }}
          placeholder="Search road, city, postal code..."
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton
          onClick={() => handleSearch(searchValue)}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SearchBox;
