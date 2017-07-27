/// <reference types="react" />
/// <reference types="mapbox-gl" />
import * as React from 'react';
import { Map } from 'mapbox-gl';
import { Props as MarkerProps } from './marker';
import * as GeoJSON from 'geojson';
export interface Props {
    ClusterMarkerFactory(coordinates: GeoJSON.Position, pointCount: number): JSX.Element;
    radius?: number;
    maxZoom?: number;
    minZoom?: number;
    extent?: number;
    nodeSize?: number;
    log?: boolean;
    children?: Array<React.Component<MarkerProps, {}>>;
}
export interface State {
    superC: any;
    clusterPoints: any[];
}
export interface Context {
    map: Map;
}
export default class Cluster extends React.Component<Props, State> {
    context: Context;
    static contextTypes: {
        map: any;
    };
    static defaultProps: {
        radius: number;
        minZoom: number;
        maxZoom: number;
        extent: number;
        nodeSize: number;
        log: boolean;
        // onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
        // onClick?: React.MouseEventHandler<HTMLDivElement>;
    };
    state: {
        superC: any;
        clusterPoints: never[];
    };
    private featureClusterMap;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    private childrenChange;
    private mapChange;
    private feature(coordinates);
    private childrenToFeatures;
    render(): JSX.Element;
}
