# Thermometer-Variation
MEAN application to display dummy device records and display in chart
The recors are inserted in the database(thermometerdb) under the collection temp_variations withe dtaa stored in data.json folder using the below command.
mongoimport -d thermometerdb -c temp_variations --type json --file data.json --jsonArray
Data in the collection is stored in the form of a json with hour and the temperature at that point.
Same is rendered on the chart using handlebarts and fusion_charts.js as the 3rd party library for chart manipulation.
The URL http://localhost:3300/ in the browser will fetch the rest api endpoint result.
Output file is attached as output.png
