import React from 'react';
import PropTypes from 'prop-types';
import GoogleLocations from 'google-locations';

const locations = new GoogleLocations(process.env.LOCATION_API);
