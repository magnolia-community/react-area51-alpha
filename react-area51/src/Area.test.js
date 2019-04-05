import Area from "./Area";


describe('Testing getPathOfPage()', () => {

    test('Not in PageEditor, reduced path. WITH serverPath & rootCMSPath ', () => {

        var urlPath = "/mars/phobos/"
        var serverPath = "/magnoliaAuthor";
        var rootCmsPath = "/solar-system";
        var inPageEditor = false;

        var myArea = new Area();
        expect(myArea.getPathOfPage(
            urlPath,
            serverPath,
            rootCmsPath,
            inPageEditor
        )).toBe('/solar-system/mars/phobos');
    });

    test('Not in PageEditor, reduced path. WITHOUT serverPath and rootCMSPath', () => {

        var urlPath = "/mars/phobos/"
        var serverPath = "";
        var rootCmsPath = "";
        var inPageEditor = false;

        var myArea = new Area();
        expect(myArea.getPathOfPage(
            urlPath,
            serverPath,
            rootCmsPath,
            inPageEditor
        )).toBe('/mars/phobos');
    });



    test('In PageEditor, full path. WITH serverPath & rootCMSPath', () => {

        var urlPath = "/magnoliaAuthor/solar-system/mars/phobos.html"
        var serverPath = "/magnoliaAuthor";
        var rootCmsPath = "/solar-system";
        var inPageEditor = true;

        var myArea = new Area();
        expect(myArea.getPathOfPage(
            urlPath,
            serverPath,
            rootCmsPath,
            inPageEditor
        )).toBe('/solar-system/mars/phobos');
    });

    test('In PageEditor, full path. WITHOUT serverPath & rootCMSPath', () => {

        var urlPath = "/mars/phobos.html"
        var serverPath = "";
        var rootCmsPath = "";
        var inPageEditor = true;

        var myArea = new Area();
        expect(myArea.getPathOfPage(
            urlPath,
            serverPath,
            rootCmsPath,
            inPageEditor
        )).toBe('/mars/phobos');
    });



})






describe('Testing getPathInPage()', () => {

    test('Not in PageEditor, reduced path. WITH serverPath & rootCMSPath ', () => {

        var fullCMSPath = "/solar-system/mars/phobos/left/00"
        var urlPath = "/mars/phobos"
        var serverPath = "/magnoliaAuthor";
        var rootCmsPath = "/solar-system";
        var inPageEditor = false;

        var myArea = new Area();
        expect(myArea.getPathInPage(
            fullCMSPath,
            urlPath,
            serverPath,
            rootCmsPath,
            inPageEditor
        )).toBe('/left/00');
    });

    test('Not in PageEditor, reduced path. WITHOUT serverPath and rootCMSPath', () => {

        var fullCMSPath = "/mars/phobos/left/00"
        var urlPath = "/mars/phobos"
        var serverPath = "";
        var rootCmsPath = "";
        var inPageEditor = false;

        var myArea = new Area();
        expect(myArea.getPathInPage(
            fullCMSPath,
            urlPath,
            serverPath,
            rootCmsPath,
            inPageEditor
        )).toBe('/left/00');
    });



    test('In PageEditor, full path. WITH serverPath & rootCMSPath', () => {

        var fullCMSPath = "/solar-system/mars/phobos/left/00"
        var urlPath = "/magnoliaAuthor/solar-system/mars/phobos.html"
        var serverPath = "/magnoliaAuthor";
        var rootCmsPath = "/solar-system";
        var inPageEditor = true;

        var myArea = new Area();
        expect(myArea.getPathInPage(
            fullCMSPath,
            urlPath,
            serverPath,
            rootCmsPath,
            inPageEditor
        )).toBe('/left/00');
    });

    test('In PageEditor, full path. WITHOUT serverPath & rootCMSPath', () => {

        var fullCMSPath = "/mars/phobos/left/00"
        var urlPath = "/mars/phobos.html"
        var serverPath = "";
        var rootCmsPath = "";
        var inPageEditor = true;

        var myArea = new Area();
        expect(myArea.getPathInPage(
            fullCMSPath,
            urlPath,
            serverPath,
            rootCmsPath,
            inPageEditor
        )).toBe('/left/00');
    });



})
