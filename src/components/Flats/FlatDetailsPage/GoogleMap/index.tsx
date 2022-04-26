/* eslint-disable */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import Typography from '@mui/material/Typography';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface GoogleMapProps {
  loading: boolean;
  title: string;
  position: { lng: number; lat: number };
}

const GoogleMap: React.VFC<GoogleMapProps> = ({ loading, title, position }) => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(15); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  React.useEffect(() => {
    setCenter(position);
  }, [position]);

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log('onIdle');
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <div
      style={{ display: 'flex', height: '100%', backgroundColor: '#BDBDBD' }}
    >
      {loading ? (
        <Typography margin="auto" color="#FFFFFF" variant="h5">
          {title}
        </Typography>
      ) : (
        <>
          {!position.lng && !position.lat && (
            <Typography margin="auto" color="#FFFFFF" variant="h5">
              {title}
            </Typography>
          )}
          {position.lng && position.lat ? (
            <Wrapper
              apiKey="AIzaSyDTkFR8F-Nx_lez26Y4rtLi6TUk6Ghwork"
              render={render}
            >
              <Map
                center={center}
                disableDefaultUI
                onClick={onClick}
                onIdle={onIdle}
                zoom={zoom}
                style={{ flexGrow: '1', height: '100%' }}
              >
                {/* {clicks.map((latLng, i) => (
                  <Marker key={i} position={latLng} />
                ))} */}
                <Marker position={position} />
              </Map>
            </Wrapper>
          ) : null}
        </>
      )}
    </div>
  );
};
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName),
      );

      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    return deepEqual(a, b);
  },
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[],
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default GoogleMap;
