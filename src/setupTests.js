import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.URL.createObjectURL = jest.fn(() => "mocked-file-url");
global.URL.revokeObjectURL = jest.fn();
