import React from 'react';
import PropTypes from 'prop-types';
import GoogleLocations from 'google-locations';
import {Search, Grid} from 'semantic-ui-react';

const locations = new GoogleLocations(process.env.LOCATION_API);

class LocationSearch extends React.component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header>State</Header>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <Header>Options</Header>
          <pre>{JSON.stringify(source, null, 2)}</pre>
        </Grid.Column>
      </Grid>
    )
  }
}
