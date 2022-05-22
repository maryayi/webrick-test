import { Grid, Typography } from '@mui/material';

interface Props {
  data: any; // TODO: change this
}

function formatDescription(str: string) {
  return str
    .replace(/(?<=^|-)[a-zA-Z]/g, (s: string) => s.toUpperCase())
    .replace(/-/g, ' ');
}

function formatPrice(num: number) {
  var re = `\\d(?=(\\d{3})+$)`;
  return num.toFixed(0).replace(new RegExp(re, 'g'), '$&,');
}

function formatTitle(str: string, maxLength: number = 30) {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}

const SearchItem: React.FC<Props> = ({ data }) => {
  return (
    <Grid
      container
      sx={{
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid #e3e3e3',
        boxShadow: '0 0 10px #e3e3e3',
        height: '100%'
      }}
    >
      <Grid item xs={12}>
        <img
          src={
            data.officialPresentation?.pictures?.[0]?.url ??
            'https://via.placeholder.com/285x142'
          }
          style={{ maxWidth: '100%', aspectRatio: '285 / 142' }}
          alt={data.officialPresentation?.pictures?.[0]?.description ?? 'home'}
        />
      </Grid>
      <Grid container item xs={12} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {formatTitle(data.officialPresentation.title)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">
            {formatDescription(data.slug)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">
            {data.sizeInM2} m<sup>2</sup>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">
            kr. {formatPrice(data.officialPresentation.price)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchItem;
