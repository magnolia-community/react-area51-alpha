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