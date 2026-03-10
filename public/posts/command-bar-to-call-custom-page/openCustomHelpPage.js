function openCustomPage() {
    var pageInput = {
        pageType: "custom",
        name: "`techtwed_mdacustomhelppage_93a75`" // The name of your custom page
    };

    var navigationOptions = {
        target: 2, // Opens the page in a dialog
        width: { value: 70, unit: "%" },
        height: { value: 70, unit: "%" },
        position: 1 // Center
    };

    Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
        function success() {
            // Code to execute on success
        },
        function error() {
            // Handle error
        }
    );
}
