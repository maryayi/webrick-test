import { useState, useCallback } from 'react';
import { Grid, Typography, Slider } from '@mui/material';

interface Props {
  value: [number | null, number | null];
  onChange: (e: any) => void;
  title: string;
  min?: number;
  max?: number;
}

const FilterSlider: React.FC<Props> = ({
  value,
  onChange,
  title,
  min = 0,
  max = 100
}) => {
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 100]);
  const handleChange = useCallback((e: any) => {
    setSliderValue(e.target.value);
  }, []);
  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={4}>
        <Typography variant="button" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          min={min}
          max={max}
          value={[
            value[0] === null ? min : value[0],
            value[1] === null ? max : value[1]
          ]}
          onChange={onChange}
          valueLabelDisplay="auto"
        />
      </Grid>
    </Grid>
  );
};

export default FilterSlider;
