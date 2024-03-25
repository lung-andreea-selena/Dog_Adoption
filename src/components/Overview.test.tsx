import {render} from '@testing-library/react';
import {vi} from 'vitest';
import Overview from '../components/Overview';
vi.mock('react-router-dom', () => ({
    ...require('react-router-dom'),
    useNavigate: () => vi.fn(),
}));
describe('renders Overview component correctly', () => {
    it('abc', () => {
        const {container} = render(<Overview />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
