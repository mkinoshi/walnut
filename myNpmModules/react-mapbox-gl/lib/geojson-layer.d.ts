/// <reference types="mapbox-gl" />
/// <reference types="react" />
import * as React from 'react';
import * as MapboxGL from 'mapbox-gl';
import { SourceOptionData } from './util/types';
export interface Props {
    id?: string;
    data: SourceOptionData;
    sourceOptions?: MapboxGL.VectorSource | MapboxGL.RasterSource | MapboxGL.GeoJSONSource | MapboxGL.GeoJSONSourceRaw;
    before?: string;
    fillLayout?: MapboxGL.FillLayout;
    fillExtrusionLayout?: MapboxGL.FillExtrusionLayout;
    symbolLayout?: MapboxGL.SymbolLayout;
    circleLayout?: MapboxGL.CircleLayout;
    lineLayout?: MapboxGL.LineLayout;
    fillPaint?: MapboxGL.FillPaint;
    fillExtrusionPaint?: MapboxGL.FillExtrusionPaint;
    symbolPaint?: MapboxGL.SymbolPaint;
    circlePaint?: MapboxGL.CirclePaint;
    linePaint?: MapboxGL.LinePaint;
    layerOptions?: MapboxGL.Layer;
}
export interface Context {
    map: MapboxGL.Map;
}
export default class GeoJSONLayer extends React.Component<Props, {}> {
    context: Context;
    static contextTypes: {
        map: any;
    };
    private id;
    private source;
    private layerIds;
    private createLayer;
    private onStyleDataChange;
    private initialize();
    componentWillMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(props: Props): void;
    render(): null;
}
