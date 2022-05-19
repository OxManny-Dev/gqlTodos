import { useAuth } from './useAuth';

export const About = () => {
	useAuth();

	return  <h1>Hello Welcome to the about page</h1>
};

export default About;
