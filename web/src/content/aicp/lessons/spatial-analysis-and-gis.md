## Learning objectives

- Distinguish vector and raster data and choose the right one for a given feature.
- Explain map scale and map projections, and why layers must share a coordinate system.
- Describe where spatial data comes from, including aerial imagery, LiDAR, and open data, and the privacy questions it raises.
- Describe buffer, overlay, and network analysis and the planning questions each answers.
- Explain land suitability analysis and its roots in McHarg's overlay method.
- Design a choropleth map that doesn't mislead, and explain the modifiable areal unit problem.
- Describe the gravity model and choose the right chart for a dataset.

## Key concepts

### What GIS does

A **geographic information system (GIS)** stores, analyzes, and displays data tied to locations. Its power comes from linking *where* something is to *what* it is: each mapped feature carries attributes in a table (a parcel's zoning, assessed value, and year built), so you can ask spatial questions like "Which vacant parcels zoned for housing are within half a mile of a transit station?"

### Vector and raster data

- **Vector data** represents discrete features as **points** (hydrants, bus stops), **lines** (streets, streams), and **polygons** (parcels, zoning districts, census tracts). It's precise and well suited to features with clear boundaries.
- **Raster data** is a grid of cells, each holding a value. It's best for **continuous surfaces** that vary across space, such as elevation, temperature, slope, land cover from satellite imagery, and flood depth.

Rule of thumb: boundaries and networks call for vector; surfaces call for raster.

:::figure fig-vector-raster | Two panels. Vector, "points, lines, and polygons": parcels drawn as polygons, a street and a stream drawn as lines, and hydrants drawn as points. Raster, "a grid of cells, each a value": a 10 by 10 grid shaded from light green to brown, where darker cells are higher ground.
Parcels have edges, so they're vector. Elevation changes smoothly from place to place, so it's raster.
:::

:::checkpoint cp:gis-vector

### Scale, projections, and coordinate systems

**Map scale** is the ratio between distance on the map and distance on the ground, such as 1:24,000 (one inch on the map equals 24,000 inches, or 2,000 feet, on the ground). The terms run opposite to intuition:

- A **large-scale** map (1:1,200 or 1:24,000) shows a **small area in great detail**, like a site plan or a neighborhood.
- A **small-scale** map (1:1,000,000) shows a **large area with little detail**, like a state or region.

The larger the second number, the smaller the scale.

A **map projection** flattens the curved Earth onto a flat surface, and every projection distorts something: area, shape, distance, or direction. Choose one suited to the purpose (an equal-area projection for comparing the size of regions, for example). Local governments usually work in a **coordinate system** built for their area, such as a U.S. **State Plane** zone, which keeps distortion small enough for parcel-level measurement. Layers must share the same coordinate system, or they won't line up and measurements will be wrong.

:::checkpoint cp:gis-scale

### Core analysis operations

- **Buffer**: create a zone of a set distance around a feature, such as a 100-foot stream setback or a quarter-mile area around each station.
- **Overlay**: combine layers to find where conditions coincide. An *intersect* keeps only areas present in all layers, for example parcels that are both vacant *and* outside the floodplain.
- **Network analysis**: measure along the street or transit network rather than as the crow flies. A half-mile *walkshed* along actual streets is often much smaller than a half-mile circle, especially where cul-de-sacs and missing sidewalks break up the grid.
- **Geocoding**: turn addresses into mapped points, such as permit locations or crash reports.
- **Joins**: an *attribute join* links a table to map features through a shared field, such as ACS data joined to tracts by tract ID. A *spatial join* links features by location, such as counting crashes that fall within each tract.
- **Spatial statistics**: test whether values cluster, for example whether crash hot spots are more concentrated than chance would produce (spatial autocorrelation).

:::figure fig-walkshed | A street map with a transit stop in the middle and a half-mile circle drawn around it. On the left is a connected street grid; on the right, a looping collector road with cul-de-sacs. Streets within a half-mile walk are highlighted: many on the grid side, but only a short stretch of the collector on the cul-de-sac side, which is "close by air, far on foot."
Both sides get the same circle, but the connected grid gives far more people a real half-mile walk. This is why station-area plans measure along the network.
:::

### Where spatial data comes from

- **Aerial and satellite imagery** show land cover, tree canopy, impervious surface, and change over time. Gathering information from a distance like this is **remote sensing**.
- **LiDAR** uses laser pulses from aircraft to measure elevation precisely. It supports floodplain mapping, slope analysis, building heights, and tree canopy studies.
- **GPS** and field data collection apps capture locations on the ground, such as sidewalk gaps or code violations.
- **Open data portals** publish government datasets for anyone to use. **Crowdsourced** data, such as resident-reported potholes or community-mapped places, adds local knowledge but reflects who chooses to participate.
- **Mobile device and app data** reveal travel patterns at fine detail, but they raise **privacy** concerns and may underrepresent people without smartphones.

Before publishing maps of sensitive data (health cases, crimes, homeless encampments, sacred sites), consider whether individual people or places could be identified. Aggregating to larger areas or displacing points slightly protects privacy.

### Suitability analysis and McHarg

Landscape architect and planner **Ian McHarg**, in *Design with Nature* (1969), argued that development should respond to natural processes. His method mapped each factor (slopes, soils, drainage, habitats, scenic value) on a separate transparent sheet and stacked them so the darkest areas showed where development would do the most harm. That **overlay method** is a direct ancestor of GIS **land suitability analysis**, in which layers are scored, weighted, and combined to rank locations for a use such as housing, conservation, or industry.

:::figure fig-mcharg | Three map layers drawn as stacked sheets, each with shaded patches: steep slopes, wet soils, and habitat. An arrow leads to the stacked result, where overlapping patches are darkest. The darkest areas are where development would do the most harm, and clear areas are best suited.
McHarg did this with transparent sheets on a light table. GIS does the same thing with scored layers and weights.
:::

A suitability analysis is only as good as its weights. Deciding how much slope matters compared with transit access is a value judgment, so it should be made transparently and, ideally, with stakeholders.

:::checkpoint cp:gis-weights

### Mapping without misleading

A **choropleth map** shades areas (tracts, counties) by value. It's the most common planning map, and the most commonly misused.

- **Map rates, not raw counts.** A count map of "households in poverty" mostly shows where many people live. Normalize by population or area (a poverty *rate*, or density per square mile).
- **Choose classification breaks deliberately.** Equal intervals, quantiles, and natural breaks can make the same data look very different. State the method in the legend.
- **Pick the right map type.** Choropleths suit rates by area. **Proportional (graduated) symbols** suit counts, sized to the value. **Dot density** maps show how things are spread across an area, with each dot standing for a set number. **Heat maps** show where point events concentrate.
- **Watch the color scheme.** Use a sequential scheme (light to dark) for low-to-high values, and a diverging scheme only when there's a meaningful midpoint.

:::figure fig-counts-rates | The same six tracts mapped two ways. Count in poverty (breaks at 600 and 1,200 people): the tract with 1,800 people in poverty is darkest, then 800 and 750, then 500, 400, and 350. This map mostly shows where people live. Poverty rate (breaks at 12% and 20%): the 32% and 25% tracts are darkest, the 15% tract is middle, and three tracts at 10% are lightest. This map shows where poverty concentrates.
Illustrative numbers. The darkest tract on the count map is simply the biggest, with 12,000 residents. Its poverty rate, 15%, is only middling.
:::

:::figure fig-class-breaks | The same 12 tract poverty rates mapped two ways. Equal intervals (4–13%, 14–23%, 24–34%) put 9 tracts in the lightest class, 1 in the middle, and only the 30% and 34% tracts in the darkest. Quantiles, with 4 tracts per class (4–6%, 7–10%, 12–34%), darken four tracts, including the ones at 12% and 14%. A note says: same data, two different stories.
Illustrative numbers. Equal intervals single out the extremes; quantiles fill every class equally, even when values bunch together. Neither is wrong, but the legend should say which you used.
:::

The **modifiable areal unit problem (MAUP)** is the fact that results change depending on how you draw the boundaries (scale or zoning of units). The same income data can show a sharp pattern at the tract level and none at the county level, or a different pattern if the tracts were drawn differently.

:::figure fig-maup | The same 24 households, 12 of them high-income, grouped two ways. Two big zones, the left and right halves, are each 50% high-income: no pattern at all. Four small zones, the quarters, are 100%, 0%, 0%, and 100%: a sharp pattern.
Nothing about the households changed, only the boundaries. That's the modifiable areal unit problem.
:::

The **ecological fallacy** is inferring something about individuals from area-level data. A tract with high average income may still have many low-income households.

:::checkpoint cp:gis-ecological

### The gravity model

The **gravity model** borrows from physics: interaction between two places increases with their size and decreases with the distance between them (often with distance squared). Planners use it to:

- distribute trips between zones in the travel demand model (the *trip distribution* step, covered in the [transportation lesson](/aicp/lessons/transportation-planning)); and
- estimate retail trade areas: how far shoppers will travel to a larger center rather than a nearer, smaller one.

:::figure fig-gravity | A shopper stands between two destinations, with pull calculated as size divided by distance squared. Corner shops, size 1, are 2 miles away: 1 ÷ 2² = 0.25. A regional center, size 4, is 3 miles away: 4 ÷ 3² = 0.44. A thicker arrow points toward the regional center.
Illustrative numbers. The bigger center is farther away but still pulls harder. Double its distance, though, and its pull falls to a quarter.
:::

:::checkpoint cp:gis-gravity

### Choosing the right chart

| You want to show | Use |
|---|---|
| Parts of a single whole, with few categories | Pie chart (or a single stacked bar) |
| Comparison across categories | Bar chart |
| Change over time | Line chart |
| Relationship between two variables | Scatter plot |
| Values across geography | Map (choropleth for rates, graduated symbols for counts) |

:::checkpoint cp:gis-line-chart

## Key terms

- **GIS**: A system for storing, analyzing, and displaying location-based data.
- **Vector data**: Points, lines, and polygons representing discrete features.
- **Raster data**: A grid of cells representing continuous surfaces.
- **Buffer**: A zone of specified distance around a mapped feature.
- **Overlay analysis**: Combining map layers to identify where conditions coincide.
- **Network analysis**: Measuring distance or travel time along a real network.
- **Land suitability analysis**: Scoring and combining layers to rank locations for a use.
- **Choropleth map**: A map that shades areas according to a value.
- **Normalization**: Converting counts to rates or densities so areas of different sizes can be compared.
- **Modifiable areal unit problem (MAUP)**: Results that change with the size or shape of the units being analyzed.
- **Ecological fallacy**: Inferring individual characteristics from group-level data.
- **Gravity model**: A model in which interaction rises with size and falls with distance.
- **Map scale**: The ratio of map distance to ground distance; a large-scale map shows a small area in detail.
- **Map projection**: A method of flattening the Earth onto a map, which always distorts area, shape, distance, or direction.
- **State Plane Coordinate System**: A set of U.S. coordinate zones designed to keep distortion low for local mapping.
- **Spatial join**: Linking features based on their location rather than a shared attribute.
- **Remote sensing**: Gathering information about the Earth's surface from aircraft or satellites.
- **LiDAR**: Laser-based measurement of elevation and surface features from aircraft.

## Real-world examples

**Finding infill sites.** A city wants to identify sites for missing-middle housing. Analysts start with vacant and underused parcels, intersect them with residential zoning, buffer frequent-transit stops by a half-mile *network* distance, and remove parcels in the floodplain or on steep slopes. The result is a short list for field review, and the maps become a tool for community conversations.

**A misleading map, corrected.** A draft map of "crimes by neighborhood" makes the downtown look dangerous. Downtown has the most crimes because it has the most people during the day. Staff redraw the map as incidents per 1,000 daytime population, and the pattern changes substantially.

**Suitability for conservation.** A county uses a McHarg-style overlay to prioritize land for a conservation easement program. It combines wetlands, prime farmland soils, wildlife corridors, and aquifer recharge areas, with weights chosen by a citizen advisory committee after a public workshop.

## Exam tips

- Continuous surfaces (elevation, temperature) are **raster**; discrete features (parcels, roads) are **vector**.
- A choropleth should show **rates or densities**, not raw counts; use proportional symbols for counts.
- When results change with how boundaries are drawn, that's the **modifiable areal unit problem**; inferring individual traits from area data is the **ecological fallacy**.
- Overlay suitability analysis traces back to **Ian McHarg**; the **gravity model** distributes trips (and retail trade) by size and distance.
- A **large-scale** map covers a *small* area in detail (1:1,200); a small-scale map covers a large area (1:1,000,000).
- Layers that don't line up usually use different **coordinate systems**.

## Summary

GIS links location to attributes so you can answer spatial questions. Use vector data for discrete features and raster data for continuous surfaces. Buffers, overlays, and network analysis answer most planning questions, and network distance is usually more honest than straight-line distance. Suitability analysis grew out of McHarg's overlay method and depends on transparent weights. On choropleth maps, map rates rather than counts, choose breaks deliberately, and remember that boundaries (MAUP) and aggregation (the ecological fallacy) can mislead. The gravity model says interaction grows with size and shrinks with distance. Remember that a large-scale map shows a small area, that every projection distorts something, and that fine-grained location data calls for care with privacy.
