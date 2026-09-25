## Learning objectives

- Distinguish vector and raster data and choose the right one for a given feature.
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

### Core analysis operations

- **Buffer**: create a zone of a set distance around a feature, such as a 100-foot stream setback or a quarter-mile area around each station.
- **Overlay**: combine layers to find where conditions coincide. An *intersect* keeps only areas present in all layers, for example parcels that are both vacant *and* outside the floodplain.
- **Network analysis**: measure along the street or transit network rather than as the crow flies. A half-mile *walkshed* along actual streets is often much smaller than a half-mile circle, especially where cul-de-sacs and missing sidewalks break up the grid.
- **Geocoding**: turn addresses into mapped points, such as permit locations or crash reports.
- **Spatial statistics**: test whether values cluster, for example whether crash hot spots are more concentrated than chance would produce (spatial autocorrelation).

### Suitability analysis and McHarg

Landscape architect and planner **Ian McHarg**, in *Design with Nature* (1969), argued that development should respond to natural processes. His method mapped each factor (slopes, soils, drainage, habitats, scenic value) on a separate transparent sheet and stacked them so the darkest areas showed where development would do the most harm. That **overlay method** is a direct ancestor of GIS **land suitability analysis**, in which layers are scored, weighted, and combined to rank locations for a use such as housing, conservation, or industry.

A suitability analysis is only as good as its weights. Deciding how much slope matters compared with transit access is a value judgment, so it should be made transparently and, ideally, with stakeholders.

### Mapping without misleading

A **choropleth map** shades areas (tracts, counties) by value. It's the most common planning map, and the most commonly misused.

- **Map rates, not raw counts.** A count map of "households in poverty" mostly shows where many people live. Normalize by population or area (a poverty *rate*, or density per square mile).
- **Choose classification breaks deliberately.** Equal intervals, quantiles, and natural breaks can make the same data look very different. State the method in the legend.
- **Watch the color scheme.** Use a sequential scheme (light to dark) for low-to-high values, and a diverging scheme only when there's a meaningful midpoint.

The **modifiable areal unit problem (MAUP)** is the fact that results change depending on how you draw the boundaries (scale or zoning of units). The same income data can show a sharp pattern at the tract level and none at the county level, or a different pattern if the tracts were drawn differently.

The **ecological fallacy** is inferring something about individuals from area-level data. A tract with high average income may still have many low-income households.

### The gravity model

The **gravity model** borrows from physics: interaction between two places increases with their size and decreases with the distance between them (often with distance squared). Planners use it to:

- distribute trips between zones in the travel demand model (the *trip distribution* step, covered in the [transportation lesson](/aicp/lessons/transportation-planning)); and
- estimate retail trade areas: how far shoppers will travel to a larger center rather than a nearer, smaller one.

### Choosing the right chart

| You want to show | Use |
|---|---|
| Parts of a single whole, with few categories | Pie chart (or a single stacked bar) |
| Comparison across categories | Bar chart |
| Change over time | Line chart |
| Relationship between two variables | Scatter plot |
| Values across geography | Map (choropleth for rates, graduated symbols for counts) |

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

## Real-world examples

**Finding infill sites.** A city wants to identify sites for missing-middle housing. Analysts start with vacant and underused parcels, intersect them with residential zoning, buffer frequent-transit stops by a half-mile *network* distance, and remove parcels in the floodplain or on steep slopes. The result is a short list for field review, and the maps become a tool for community conversations.

**A misleading map, corrected.** A draft map of "crimes by neighborhood" makes the downtown look dangerous. Downtown has the most crimes because it has the most people during the day. Staff redraw the map as incidents per 1,000 daytime population, and the pattern changes substantially.

**Suitability for conservation.** A county uses a McHarg-style overlay to prioritize land for a conservation easement program. It combines wetlands, prime farmland soils, wildlife corridors, and aquifer recharge areas, with weights chosen by a citizen advisory committee after a public workshop.

## Exam tips

- Continuous surfaces (elevation, temperature) are **raster**; discrete features (parcels, roads) are **vector**.
- A choropleth should show **rates or densities**, not raw counts.
- When results change with how boundaries are drawn, that's the **modifiable areal unit problem**; inferring individual traits from area data is the **ecological fallacy**.
- Overlay suitability analysis traces back to **Ian McHarg**.
- The **gravity model** distributes trips (and retail trade) by size and distance.

## Summary

GIS links location to attributes so you can answer spatial questions. Use vector data for discrete features and raster data for continuous surfaces. Buffers, overlays, and network analysis answer most planning questions, and network distance is usually more honest than straight-line distance. Suitability analysis grew out of McHarg's overlay method and depends on transparent weights. On choropleth maps, map rates rather than counts, choose breaks deliberately, and remember that boundaries (MAUP) and aggregation (the ecological fallacy) can mislead. The gravity model says interaction grows with size and shrinks with distance.
