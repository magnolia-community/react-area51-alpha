import { removeFileExtension, removeTrailingSlash } from "./Helpers";

describe('Testing removeFileExtension()', () => {

    test('remove nothing if no extension', () => {
        expect(removeFileExtension('hey')).toBe('hey');
    });

    test('remove .jpeg', () => {
        expect(removeFileExtension('hey.jpeg')).toBe('hey');
    });

    test('remove only .jpeg', () => {
        expect(removeFileExtension('hey.joe.jpeg')).toBe('hey.joe');
    });

})

describe('Testing removeTrailingSlash()', () => {

    test('remove nothing if no slash', () => {
        expect(removeTrailingSlash('hey')).toBe('hey');
    });

    test('remove slash at end', () => {
        expect(removeTrailingSlash('hey/')).toBe('hey');
    });

    test('Dont remove other slashes', () => {
        expect(removeTrailingSlash('hey/there')).toBe('hey/there');
    });

})