/// <reference types="react" />
import * as React from 'react';
import { Anchor } from './util/overlays';
import * as GeoJSON from 'geojson';
import { PointDef } from './util/overlays';
export interface Props {
    coordinates: GeoJSON.Position;
    anchor?: Anchor;
    offset?: number | number[] | PointDef;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    style?: React.CSSProperties;
    className?: string;
}
export default class Popup extends React.Component<Props, {}> {
    static defaultProps: {
        anchor: string;
    };
    render(): JSX.Element;
}
