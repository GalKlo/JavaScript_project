# belly-button-challenge

An interactive dashboard was built to explore the Belly Button Biodiversity dataset. 

* Data was retrieved from URL (https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.D3) using D3 library.

* Values in the dropdown menu were updated based on the nameIDs in the dataset.

* Two charts were built to display the analysis results:
    - Bar chart - shows top 10 OTUs found in that individual. Sample_values is used as the values, otu_ids as the labels and otu_labels as the hovertext.
    - Bubble chart - displays each sample. Uses otu_ids for the x values, sample_values for the y values, sample_values for the marker size, otu_ids for the marker color, otu_labels for the text values.

* Sample metadata, i.e., an individual's demographic information is displayed in the Demographic Info box. The metadata includes each key-value pair from the metadata JSON object. 

Both charts and the metadata are dynamically changing based on the nameID selected in the dropdown menu


