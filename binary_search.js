// where to display the full array on the home page
const array_display_tag = document.getElementById('array_elements');
// where to display the result of the search on the home page
let output_tag = document.getElementById('output_success')
// where to display the split counter on the home page
let counter_tag = document.getElementById('counter');
// get the user input from the search input box
const search_form = document.getElementById('search_form');
search_form.addEventListener('submit', start_app)

//  Define the array, sort it, and display on the home page
let test_array = [
    52, 78, 42, 15, 89, 97, 61, 3, 24, 33, 82, 59, 92, 71, 45, 67, 11, 39, 95, 80,
    12,
];
// Use a compare function to sort the numbers
function compareNumbers(a, b) {
    return a - b; // If a is greater than b, return positive. If a is less than b, return negative.
  }
test_array = test_array.sort(compareNumbers);
console.log('test_array (sorted):', test_array)
//  Show the array on the home page
array_display_tag.innerText = test_array;

//  Define a counter to count the number of splits in the binary search
let counter = 0;

// create an array of the array's index numbers in str format
let index_arr_str = []
for (x in test_array) {
    index_arr_str.push(x)
}
console.log('index_arr_str:', index_arr_str)


function start_app(event) {
    /* Create the counter variable, used to count the splits. Create the num variable - the searched for number. Create an initial median number, and send it to get checked for the searched number. */
    event.preventDefault();
    output_tag.innerText = '';
    counter = 0;
    const num = document.getElementById('num').value;
    console.log('searching for:', num);
    first_median = make_median_index(index_arr_str);
    check_median(index_arr_str, first_median, num);


function make_median_index(arr) {
    /* Add 1 to the counter variable and display it on the home page. Find the median of the passed in array (which is the index numbers of the original numbers array) and return the median. Has some code in the event the median is 0 or 1. */
    counter++;
    counter_tag.innerText = counter;
    let median = Math.floor(arr.length/2);
    console.log('make_median_index is running - median index number:', median, '& median element:', test_array[arr[median]]);
    // Code to check for the searched number when the median gets down towards 0.
    if ((arr.length/2) <= 1){
        if (test_array[arr[0]] == num || test_array[arr[1]] == num  ) {
            console.log(`Found "${num}" at index position ${arr[median]}.`)
            output_tag.innerText = `Found "${num}" at index position ${arr[median]}.`
            // Throw an error to stop the app
            throw new Error("Found - exitting.");
        } else {
            // If the searched number was not found:
            output_tag.append(`Did not find "${num}". Stopping App.`);
            // Throw an error to stop the app
            throw new Error(`Did not find "${num}". Stopping App.`);
            } 
    } else {
    return median} 
} // END median_index()


function check_median(arr, median, num){
    /* Check a passed in array for the searched number, and create 'result' variable that indicates whether the searched number is greater than, or less than the median. */
        let result = 'Error - Not Processing';
        if (test_array[arr[median]] == num) {
            console.log(`Found "${num}" at index position ${arr[median]}.`)
            output_tag.innerText = `Found "${num}" at index position ${arr[median]}.`
        } else if (num > test_array[arr[median]]) {
            result = 'Greater than median'
            slice_array(arr, result, median)
            } else {        
            result = 'Less than median';
            slice_array(arr, result, median)}
        } // END check_median()


function slice_array(arr, result, median){
    /* Using the result variable guidance; slice the array & remove the unneeded half, then send the surviving array to get checked for the searched number. */
    if (result == 'Greater than median') {
        console.log('Searched number is greater than median.')
        // median is the start index to create the split array
        const half_slice = arr.slice(median);
        const new_median = make_median_index(half_slice);
        // Send the new split array to get checked for the searched number
        check_median(half_slice, new_median, num);
    } else {
        console.log('Searched number is less than median.'); 
        // the split starts at position 0 ends at median +1 
        end_index = median + 1;
        const half_slice = arr.slice(0, end_index);
        const new_median = make_median_index(half_slice);
        // Send the new split array to get checked for the searched number
        check_median(half_slice, new_median, num);
    }
}  // END slice_array()

}  // END start_app()