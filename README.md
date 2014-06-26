Innova.RE Map
=========

"Innova.RE Map" is a JavaScript library which helps you to build custom maps to help users to get directions from one place to another without writing any line of JavaScript code.


"Innova.RE Map" lets you extend HTML vocabulary to build your custom map. 

Examples
--------------

I want to help a user to get direction to a specific place which is not reachable on the google maps because far away from the road.

The code needed to provide these information includes the following attributes:

 - **data-coords**: it is used to add a shape to your map. The specified value consists of an array of latitude and longitude locations. The library will create a series of line segments that connect those locations in an ordered sequence as displayed in the following picture.
 ![](src/images/readme-data-coords.png?raw=true)

```
data-coords="39.230203, 9.107526, 39.230514, 9.107891, 39.229883, 9.108100, 39.229837, 9.107790, 39.230041, 9.107548, 39.230203, 9.107526"
```

- **data-walking-path**: it is used to add a path to your map between the last known location on the main road mapped by google map and a place far away from the road.
 ![](src/images/readme-walking-path.png?raw=true)

```
data-walking-path="39.229689, 9.107713, 39.22981, 9.10814, 39.230175, 9.108046, 39.230185, 9.107969"
```

- **data-plan**: it is used to display an image when the mouse pointer enters the shape element added with **data-coords** attribute.
 ![](src/images/readme-data-plan.png?raw=true)

- **data-value**: it is used to display the last known location according "google-map" on the map. It takes three parameters which are in the order: the latitude, the longitude and the zoom level.
![](src/images/readme-last-known-location-plan.png?raw=true)

```
<option 
    data-value="39.229686, 9.107726, 19"
    data-coords="39.230203, 9.107526, 39.230514, 9.107891, 39.229883, 9.108100, 39.229837, 9.107790, 39.230041, 9.107548, 39.230203, 9.107526"
    data-walking-path="39.229689, 9.107713, 39.22981, 9.10814, 39.230175, 9.108046, 39.230185, 9.107969"
    data-plan="ING-laboratorio-software.jpg">
    Ingegneria - Laboratorio Software
</option>
```

Installation
--------------
To compile "Innova.RE Map" by yourself, first of all, make sure that you have "Bower" and "Git" installed, then:
```sh
git clone git@github.com:innova-re/map.git
cd map
bower install 
```

Version
----

0.1

License
----

## License

MIT, see [LICENSE.md](./LICENSE.md).
