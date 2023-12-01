// Read URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data 
d3.json(url).then(function (data) {

    // Declare a variable for names to select
    let nameSelection = data.names;

    // Declare a variable to hold selection of the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Add name values to dropdown menu
    function namesLoop(element, namesList) {
        for (let i = 0; i < namesList.length; i++) {
            element.append("option").text(namesList[i]).property("value", namesList[i]);
        }
    }
    namesLoop(dropdownMenu, nameSelection);

    // Create a function that retrieve data for charts
    function newData(element) {
        // Variable to hold name ID value to build plots
        let nameId = element.property("value");

        // Filter data by name ID
        function checkId(record) {
            return record.id == nameId;
        }
        let dataList = data.metadata.filter(checkId)[0];
        let sampleData = data.samples.filter(checkId)[0];

        // Sort the data by sample values descending
        let sortedSampleData = sampleData.sample_values.map(
            (value, index) => {
                return {
                    sample_values: value,
                    otu_ids: `OTU ${sampleData.otu_ids[index]}`,
                    otu_labels: sampleData.otu_labels[index]
                };
            }).sort((firstNum, secondNum) => secondNum.sample_values - firstNum.sample_values);

        // Slice Data for barchart
        let slicedSampleData = sortedSampleData.slice(0, 10)

        // Reverse the array to accommodate Plotly's defaults
        let reversedData = slicedSampleData.reverse();

        // Set trace for barchart
        let trace1 = [{
            x: reversedData.map(object => object.sample_values),
            y: reversedData.map(object => object.otu_ids),
            text: reversedData.map(object => object.otu_labels),
            type: "bar",
            orientation: "h"
        }];

        // Set trace for bubblechart
        let trace2 = [{
            x: sampleData.otu_ids,
            y: sampleData.sample_values,
            text: sampleData.otu_labels,
            mode: 'markers',
            marker: {
                color: sampleData.otu_ids,
                size: sampleData.sample_values
            }
        }];

        return ([trace1, trace2, dataList]);
    }

    // Set Layout for Barchart
    let layout1 = {
        title: "Top 10 OTUs",
    };

    // Set Layout for Bublechart
    let layout2 = {
        title: 'OTU ID by sample size',
        showlegend: false,
        xaxis: {
            title: {
                text: 'OTU ID',
            }
        }
    }

    // Display the default charts
    function init() {
        newDataArray = newData(dropdownMenu);
        Plotly.newPlot("bar", newDataArray[0], layout1);
        Plotly.newPlot("bubble", newDataArray[1], layout2);
    }

    // Display Demographic info
    // Select html element
    let sampleMetadata = d3.select(".panel-body");

// Populate the data
function metaDataUpdate(element) {
    // Clear existing content
    element.html("");
    newMetadata = newData(dropdownMenu)[2]
    // Print pair key: value for every exiting key in the data  
    for (let key in newMetadata) {
        sampleMetadata.append('p').text(`${key}:${newMetadata[key]}`);
    }
}
metaDataUpdate(sampleMetadata)

// On change to filter, update data in charts
dropdownMenu.on("change", function () {
    newDataArray = newData(dropdownMenu);
    Plotly.react("bar", newDataArray[0], layout1);
    Plotly.react("bubble", newDataArray[1], layout2);
    metaDataUpdate(sampleMetadata);
});

init();
});

