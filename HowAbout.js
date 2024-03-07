
document.getElementById('whenSelect').addEventListener('change', function() {
    // Get the selected value
    var selectedValue = this.value;

    // Update the URL with the selected value
    window.history.pushState({}, '', '?when=' + selectedValue);
});

