$(document).ready(function() {

    if (document.getElementById('header').getAttribute("style") != null) {
        // header image is already here. A redmine attachment has been used as background image (see etf1 hack in app/views/layouts/base.rhtml)
        return;
    }

    /**
     * Extract the project name as found in the quick search select box at the given index position
     * @param  integer index position of the selected project in the select box
     * @return string        project name
     */
    function extractProjectName(index) {
        return select.childNodes.item(index).value.replace(/\/projects\/(.*)\?.*/, '$1').replace(/(dt-|-dt)/, '');
    }

    /**
     * Return true if the given index position in the quick search select box matches a sub project
     * @param  integer  index position of the selected project in the select box
     * @return boolean        true if the project is a sub project
     */
    function isASubProject(index) {
        return select.childNodes.item(index).innerHTML.indexOf('»') != -1;
    }

    var select = $('#quick-search select')[0];

    /**
     * Load projectId.jpg as background image for the header
     * if it fails, try parentProjectId.jpg
     */
    function loadBackgroundMatchingItem(i) {
        var projectName = extractProjectName(i);

        var tester = new Image();
        var url = "/themes/tf1/images/" + projectName + ".jpg";
        tester.onload = function() {
            console.log('onload');
            $('#header').css('background', "url(" + url + ") no-repeat scroll 0 -23px black");
        }
        tester.onerror = function() {
            console.log('onerror');
            if (!isASubProject(i)) {
                // nothing else we can do
                return;
            }
            // The subproject has no associated image. Maybe the parent has one.
            do {
                i--;
            } while (isASubProject(i));
            loadBackgroundMatchingItem(i);
        }
        tester.src = url;
    }

    loadBackgroundMatchingItem(select.selectedIndex);
});
