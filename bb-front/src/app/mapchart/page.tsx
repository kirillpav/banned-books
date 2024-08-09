"use client";

import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
	"https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

export default function mapchart() {
	return (
		<ComposableMap>
			<Geographies geography={geoUrl}>
				{({ geographies }) =>
					geographies.map((geo) => (
						<Geography key={geo.rsmKey} geography={geo} stroke="white" />
					))
				}
			</Geographies>
		</ComposableMap>
	);
}
