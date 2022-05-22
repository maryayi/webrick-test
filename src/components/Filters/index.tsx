import { useState, ChangeEvent, useMemo } from 'react';
import FilterSlider from 'components/FilterSlider';
import { Grid } from '@mui/material';

type Props = {
  onChangeCommitted: (value: any) => void;
};

const Filters = ({ onChangeCommitted }: Props) => {
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

  const finalValues = useMemo(() => {
    return {
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
    };
  }, [
    priceValues,
    sizeValues,
    baseSizeValues,
    planValues,
    roomValues,
    yearOfConstructionValues
  ]);
  return (
    <Grid container item xs={12} spacing={5}>
      <Grid item xs={12} md={6}>
        <FilterSlider
          title="Price"
          min={0}
          max={10000000}
          value={priceValues}
          onChangeCommitted={() => onChangeCommitted(finalValues)}
          onChange={(e: ChangeEvent<any>) => {
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
          onChangeCommitted={() => onChangeCommitted(finalValues)}
          onChange={(e: ChangeEvent<any>) => {
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
          onChangeCommitted={() => onChangeCommitted(finalValues)}
          onChange={(e: ChangeEvent<any>) => {
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
          onChangeCommitted={() => onChangeCommitted(finalValues)}
          onChange={(e: ChangeEvent<any>) => {
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
          onChangeCommitted={() => onChangeCommitted(finalValues)}
          onChange={(e: ChangeEvent<any>) => {
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
          onChangeCommitted={() => onChangeCommitted(finalValues)}
          onChange={(e: ChangeEvent<any>) => {
            setYearOfConstructionValues(e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
