import React from 'react';

import { useLazyQuery } from '@apollo/client';
import { useInput } from '../../hooks/useInput';
import { GET_WEATHER } from '../../query/weather';
import { WeatherBlock } from '../WeatherBlock/WeatherBlock';

import './index.css';

export const Form: React.FC = () => {
  const [city, handleCity] = useInput('');

  const [getData, { data, error, loading }] = useLazyQuery(GET_WEATHER);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    getData({
      variables: {
        name: city,
        config: {
          lang: 'ru',
          units: 'metric',
        },
      },
    });
  };

  return (
    <div>
      <form className="form">
        <label htmlFor="city" className="form__label">
          Type your city:
        </label>
        <input
          type="text"
          name="city"
          id="city"
          className="form__input"
          value={city}
          onChange={(e) => handleCity(e)}
        />
        <button className="form__btn" onClick={(e) => onClickHandler(e)}>
          Get the weather
        </button>
      </form>
      {loading && <div>loading...</div>}
      {error && <div>something went wrong...</div>}
      {data && <WeatherBlock data={data} />}
    </div>
  );
};
